import React from 'react';
import fakeData from '../../simple-resources/fakeData/index'

const Inventory = () => {
    const handelAddProduct = () =>{
        fetch('http://localhost:4000/addProduct',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fakeData)
        })
        .then(res => res.json())
        .then(data =>{
            if(data){
                alert('Product Added Successfully')
            }
        })
    }
    return (
        <div>
            <button onClick={handelAddProduct}>Add Product</button>
        </div>
    );
};

export default Inventory;