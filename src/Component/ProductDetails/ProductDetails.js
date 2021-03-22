import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../simple-resources/fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productId} = useParams()
    const product = fakeData.find(pd => pd.key === productId)
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