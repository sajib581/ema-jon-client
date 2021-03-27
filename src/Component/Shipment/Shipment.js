import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="ship-form">
                
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

        </div>
    );
};

export default Shipment;