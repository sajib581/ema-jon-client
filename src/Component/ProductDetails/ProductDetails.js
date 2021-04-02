import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productId} = useParams()
    const [product, setProduct] = useState({})
    useEffect(()=>{
        fetch(`https://lit-temple-12670.herokuapp.com/product/${productId}`)
        .then(response => response.json())
        .then(data =>{
            setProduct(data[0])
        })
    },[])

    return (
        <div>
            <Product
                showAddToCart = {false}
                product = {product}
            ></Product>
        </div>
    );
};

export default ProductDetails;