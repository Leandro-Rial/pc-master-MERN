import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import Home from './Home/Home';
import Details from './Details/Details';
import Cart from './Cart/Cart';
import Categories from '../mainPages/Categories/Categories';
import CreateProducts from './CreateProduct/CreateProduct';
import Login from './Auth/Login';
import Register from './Auth/Register';
import NotFound from './Utils/NotFound/NotFound';

const Pages = () => {

    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;

    return (
        <Switch>
            <Route exact path="/" component={Home} />

            <Route path="/detail/:id" component={Details} />

            <Route path="/login" component={ isLogged ? NotFound : Login } />
            <Route path="/register" component={ isLogged ? NotFound : Register } />
            
            <Route path="/create_product" component={ isAdmin ? CreateProducts : NotFound } />
            <Route path="/edit_product/:id" component={ isAdmin ? CreateProducts : NotFound } />

            <Route path="/category" component={ isAdmin ? Categories : NotFound} />

            <Route path="/cart" component={Cart} />
            
            <Route path="*" component={NotFound} />
        </Switch>
    )
}

export default Pages
