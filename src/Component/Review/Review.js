import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../simple-resources/utilities/databaseManager';
import fakeData from '../../simple-resources/fakeData';
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

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = savedCart[key]
            return product
        })

        setcart(cartProducts)
    }, [])
    const history = useHistory()
    const handelProceedCheckOut = () =>{
        // setcart([])
        // setorderPlaced(true)
        // processOrder()
        history.push("/shipment")
    }
    let thankYou ;
    if(orderPlaced){
        thankYou = <img src={happyImage}></img> 
    }
   
    return (
        <div className="twin-container">            
            
            <div className="product-container" >
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