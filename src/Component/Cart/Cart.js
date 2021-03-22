import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const { cart } = props
    console.log(cart);
    const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0)
    let shipping = 0;
    if(totalPrice > 35){
        shipping = 0 ;
    }
    else if(totalPrice > 15){
        shipping = 4.99 ;
    }
    else if(totalPrice > 0){
        shipping = 12.0 ;
    }
    return (
        <div>
            <h4>Order Summary</h4>
            <h4>Items Ordered : {cart.length}</h4>
            <h4>Producct Price : {totalPrice}</h4>
            <h4>Shipping Cost : {shipping}</h4>
            <h5>Total Price : {(totalPrice + shipping).toFixed(2)}</h5> <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;