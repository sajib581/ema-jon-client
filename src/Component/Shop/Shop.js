import React, { useState } from 'react';
import fakeData from '../../simple-resources/fakeData';

const Shop = () => {
    console.log(fakeData);
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10)
    return (
        <div>
            <h1>This is Shop</h1>
            {
                products && products.map(product => <li>{product.name}</li> )
            }
        </div>
    );
};

export default Shop;