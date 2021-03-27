import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../simple-resources/utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../simple-resources/images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setcart] = useState([])
    const [orderPlaced, setorderPlaced] = useState(false)
    const removeProduct = key => {
        removeFromDatabaseCart(key)
        const newcart = cart.filter(pd => pd.key !== key)
        setcart(newcart)
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)
        const counts = Object.values(savedCart)

        fetch('http://localhost:4000/productsByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const newCart = data.map(dt => {
                        dt.quantity = savedCart[dt.key]
                        return dt;
                    })
                    setcart(newCart)
                }
            })
    }, [])
    console.log(cart);
    const history = useHistory()
    const handelProceedCheckOut = () => {
        // setcart([])
        // setorderPlaced(true)
        // processOrder()
        history.push("/shipment")
    }
    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage}></img>
    }

    return (
        <div className="twin-container">

            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem key={pd.key} removeProduct={removeProduct} product={pd}></ReviewItem>)
                }
                {thankYou}
            </div>

            <div>
                <Cart cart={cart}>
                    <button onClick={handelProceedCheckOut} className="main-button">Proceed Order</button>
                </Cart>
            </div>

        </div>

    );
};

export default Review;