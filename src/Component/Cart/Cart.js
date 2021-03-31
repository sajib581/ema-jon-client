import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const { cart } = props
    const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity || 1, 0)
    let shipping = 0;
    if (totalPrice > 35) {
        shipping = 0;
    }
    else if (totalPrice > 15) {
        shipping = 4.99;
    }
    else if (totalPrice > 0) {
        shipping = 12.0;
    }
    return (
        <div className="d-flex justify-content-center">

            <div className="cart-container mt-3">
                <div className="cart">
                    <h3>Order Summary</h3>
                    <p>Items ordered: {cart.length}</p>
                    <table>
                        <tbody>
                            <tr>
                                <td><small>Items:</small></td>
                                <td><small>{cart.length}</small></td>
                            </tr>
                            <tr>
                                <td><small>Shipping &amp; Handling:</small></td>
                                <td><small>{shipping}</small></td>
                            </tr>
                            <tr>
                                <td><small>Total before tax:</small></td>
                                <td><small>{totalPrice.toFixed(2)}</small>  </td>
                            </tr>
                            <tr className="total-row">
                                <td><small>Order Total:</small></td>
                                <td><small>{(totalPrice + shipping).toFixed(2)}</small></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {
                    props.children
                }
            </div>
        </div>
    );
};

export default Cart;