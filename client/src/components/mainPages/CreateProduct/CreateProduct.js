import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import Loading from '../Utils/Loading/Loading';
import { useHistory, useParams } from 'react-router-dom';

const initialState = {
    product_id: "",
    title: "",
    price: 123,
    description: "",
    content: "",
    category: "",
    _id: ""
}

const CreateProduct = () => {

    const state = useContext(GlobalState);
    const [product, setProduct] = useState(initialState);
    const [categories] = state.categoriesAPI.categories;
    const [products] = state.productAPI.products;
    const [callback, setCallback] = state.productAPI.callback;
    const [images, setImges] = useState(false);
    const [loading, setLoading] = useState(false);
    const [onEdit, setOnEdit] = useState(false);

    const [token] = state.token;
    const [isAdmin] = state.userAPI.isAdmin;

    const history = useHistory();
    const param = useParams();

    useEffect(() => {
        if(param.id) {
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id){
                    setProduct(product)
                    setImges(product.images)
                }
            })
        } else {
            setOnEdit(false)
            setProduct(initialState)
            setImges(false)
        }
    }, [param.id, products])

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            
            if(!isAdmin) return alert("You're not an Admin")

            const file = e.target.files[0]

            if(!file) return alert("File not exist.")

            if(file.size > 1024 *1024) return alert("Size too large")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') return alert("File format incorrect");

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)

            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)

            setImges(res.data)

        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            
            if(!isAdmin) return alert("You're not an admin")

            setLoading(true)

            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })

            setLoading(false)
            setImges(false)

        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]:value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {

            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No images Upload")

            if(onEdit) {
                await axios.put(`/api/products/${product._id}`, {...product, images}, {
                    headers: {Authorization: token}
                })
            } else {
                await axios.post('/api/products', { ...product, images }, {
                    headers: {Authorization: token}
                })
            }
            
            setCallback(!callback)
            history.push('/')

        } catch (error) {
            alert(error.data.response.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                {
                    loading ? <div id="file_img"><Loading /></div>
                    :
                    <div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt="" />
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
            </div>

            <form onSubmit={onSubmit}>
            <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required
                    value={product.product_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={product.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                    value={product.price} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={product.description} rows="5" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                    value={product.content} rows="7" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} onChange={handleChangeInput}>
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateProduct
