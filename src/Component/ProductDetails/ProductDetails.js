import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productId} = useParams()
    const [product, setProduct] = useState({})
    useEffect(()=>{
        fetch(`http://localhost:4000/product/${productId}`)
        .then(response => response.json())
        .then(data =>{
            setProduct(data[0])
        })
    },[])

    return (
        <div>
            <h2>Product Details Coming Soon</h2>
            <h3>{productId}</h3>
            <Product
                showAddToCart = {false}
                product = {product}
            ></Product>
        </div>
    );
};

export default ProductDetails;