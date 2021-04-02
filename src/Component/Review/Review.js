import React, { useContext, useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../simple-resources/utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';

const Review = () => {
    const [cart, setcart] = useState([])
    const [, , , , totalCart, setTotalCart] = useContext(UserContext)

    const removeProduct = key => {
        removeFromDatabaseCart(key)
        const newcart = cart.filter(pd => pd.key !== key)
        setcart(newcart)

        const cartValueArray = Object.values(getDatabaseCart())
        const totalNumberCart = cartValueArray.reduce((total, value) => total + value, 0)
        setTotalCart(totalNumberCart)
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)
        const counts = Object.values(savedCart)

        fetch('https://lit-temple-12670.herokuapp.com/productsByKeys', {
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
    const history = useHistory()
    const handelProceedCheckOut = () => {        
        history.push("/shipment")
    }

    return (
        <div className="twin-container">

            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem key={pd.key} removeProduct={removeProduct} product={pd}></ReviewItem>)
                }
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