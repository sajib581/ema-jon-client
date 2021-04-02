import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import { UserContext } from '../../App';
import './Shipment.css'
import happyImage from '../../simple-resources/images/giphy.gif'
import { processOrder } from '../../simple-resources/utilities/databaseManager';

const Shipment = () => {
    const history = useHistory()
    const [orderPlaced, setorderPlaced] = useState(false)
    const [, , products, setProducts, totalCart, setTotalCart] = useContext(UserContext)
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        fetch('https://lit-temple-12670.herokuapp.com/addAOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    processOrder()
                    alert('Order Added successfully')
                    setorderPlaced(true)
                    setTotalCart(0)
                }
            })
        setorderPlaced(true)
    }
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    let thankYou;
    if (orderPlaced) {
        thankYou = <img style={{position: "absolute" , right: '100px'}} src={happyImage}></img>
    }
    return (
        <div  className="d-flex">
           {
               orderPlaced &&  <button onClick={()=>history.push('/')} style={{position: 'fixed', left: '15%', top:"50%"}} className="btn btn-brand">Back To Home Page</button>
           } 
            <form style={{ display: orderPlaced ? "none" : "block"}} onSubmit={handleSubmit(onSubmit)} className="ship-form">

                <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} />
                {errors.name && <span>This field is required</span>}

                <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} />
                {errors.email && <span>This field is required</span>}

                <input name="phone" placeholder="Enter phone number" ref={register({ required: true })} />
                {errors.phone && <span>This field is required</span>}

                <input name="address" placeholder="Address" ref={register({ required: true })} />
                {errors.address && <span>This field is required</span>}

                <input type="submit" />
            </form>
            {
                thankYou
            }

        </div>
    );
};

export default Shipment;