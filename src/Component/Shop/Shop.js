import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../simple-resources/utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import Pagination from 'react-bootstrap/Pagination'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [viewProducts, setViewProducts] = useState([])
    const [active, setActive] = useState(1) ;

    //react-bootstrap pagination criteria
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    const paginationHandler = (e) => {
        const pressedNumber = e ? Number(e.target.innerText) : 1
        const viewProduct = products.slice((pressedNumber-1)*20, pressedNumber*20)
        setViewProducts(viewProduct)
        setActive(pressedNumber)
    }
    
    useEffect(() => {
        paginationHandler()
    },[products])

    useEffect(() => {
        fetch("http://localhost:4000/getAllPrpoducts")
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)
        const counts = Object.values(savedCart)

        if (products.length > 0) {
            const cartProducts = productKeys.map(key => {
                const product = products.find(pd => pd.key === key)
                product.quantity = savedCart[key]
                return product
            })

            setCart(cartProducts)
        }
    }, [products])

    const handelAddProduct = (product) => {
        const toBeAdded = product.key
        const sameProduct = cart.find(pd => pd.key === toBeAdded)
        let count = 1;
        if (sameProduct) {
            const othersCart = cart.filter(pd => pd.key !== toBeAdded)
            sameProduct.quantity += 1
            count = sameProduct.quantity
            const newCart = [...othersCart, sameProduct]
            setCart(newCart)
        } else {
            product.quantity = count
            const newCart = [...cart, product]
            setCart(newCart)
        }
        addToDatabaseCart(product.key, count)
    }

    return (
        <div>
            <div className="twin-container">
                <div className="product-container">
                    {
                        products && viewProducts.map(product => <Product product={product} showAddToCart={true} handelAddProduct={handelAddProduct}></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/review"><button className="main-button">Review Order</button></Link>
                    </Cart>
                </div>
            </div>
            <div className="my-5">
            {
                viewProducts.length > 0 && <Pagination className="d-flex justify-content-center" onClick={paginationHandler}>{items}</Pagination>
            }
            </div>
        </div>
    );
};

export default Shop;