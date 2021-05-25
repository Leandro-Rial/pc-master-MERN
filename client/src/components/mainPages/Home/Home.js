import React from 'react';
import Products from '../Products/Products';

const Home = () => {
    return (
        <div>
            <div className="bg">
                <div className="content">
                    <h1>PC MASTER</h1>
                    <h3>Welcome to our website see all our products
                    </h3>
                </div>
            </div>
            <div className="find">
                <h2>Here you can find</h2>
                <div className="catalogo-express">
                    <div className="cards">
                        <h3>Equipos y Notebooks</h3>
                    </div>
                    <div className="cards">
                        <h3>Motherboards</h3>
                    </div>
                    <div className="cards">
                        <h3>Memorias RAM</h3>
                    </div>
                    <div className="cards">
                        <h3>Almacenamiento</h3>
                    </div>
                    <div className="cards">
                        <h3>Placas de video</h3>
                    </div>
                    <div className="cards">
                        <h3>Perifericos</h3>
                    </div>
                </div>
            </div>
            <Products />
        </div>
    )
}

export default Home
