import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../simple-resources/fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../simple-resources/utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect(()=>{
        fetch("http://localhost:4000/getAllPrpoducts")
        .then(response => response.json())
        .then(data => setProducts(data))
    },[])
    
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)
        const counts = Object.values(savedCart)

        if(products.length > 0){
            const cartProducts = productKeys.map(key => {
                const product = products.find(pd => pd.key === key)
                product.quantity = savedCart[key]
                return product
            })
    
            setCart(cartProducts)
        }
    }, [products])
    

    const handelAddProduct = (product) =>{
        const toBeAdded = product.key
        const sameProduct = cart.find(pd => pd.key === toBeAdded)
        let count = 1 ;
        if(sameProduct){
            const othersCart = cart.filter(pd => pd.key !== toBeAdded)
            sameProduct.quantity +=  1
            count = sameProduct.quantity
            const newCart = [...othersCart, sameProduct]
            setCart(newCart)
        }else{
            product.quantity = count
            const newCart = [...cart, product]
            setCart(newCart)
        }                        
        addToDatabaseCart(product.key, count)
    }
    
    return (
        <div className="twin-container">
            <div className="product-container"> 
            {
                products && products.map(product => <Product product={product} showAddToCart={true} handelAddProduct={handelAddProduct}></Product> )
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to="/review"><button className="main-button">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;