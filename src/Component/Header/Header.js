import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { a, Link, useHistory } from 'react-router-dom';
import logo from '../../../src/simple-resources/images/logo.png'
import { CartContext, UserContext } from '../../App';
import './Header.css'
import { getDatabaseCart } from '../../simple-resources/utilities/databaseManager';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [,,products, setProducts, totalCart, setTotalCart] = useContext(UserContext)
    const [search, setSearch] = useState("")
    const history = useHistory()

    const logOutHandeler = () => {
        setLoggedInUser({
            isSignedIn: false,
            name: '',
            email: '',
            image: ''
        })
        localStorage.removeItem("userInfo")
        history.push("/")
    }
    console.log( getDatabaseCart() );
    useEffect(() => {
        console.log(search);
        fetch('https://lit-temple-12670.herokuapp.com/search?filter='+search)
        .then(response => response.json())
        .then(data => {
            setProducts(data)
        })        
    }, [search])
    const searchHandeler = (e) => {
        setSearch(e.target.value)
    }
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Admin</Link>
                {
                    loggedInUser.isLoggedIn ?
                        <button onClick={logOutHandeler} className="btn-brand">LogOut</button> :
                        <button onClick={() => history.push("/login")} className="btn-brand">LogIn</button>
                }
            </nav>
            <nav className="d-flex justify-content-center d-flex align-items-center mb-2 pb-2 pt-1">
                <input onChange={searchHandeler} name="stock" className="form-control w-75 h-25" placeholder="Search Your Product" /> <FontAwesomeIcon onClick={()=> history.push("/review") } className="ml-2" style={{color: 'white', cursor: 'pointer'}} icon={faShoppingCart} />{totalCart>0 && <span onClick={()=> history.push("/review")} style={{color: 'white', cursor: 'pointer'}}> ({totalCart})</span>}  
            </nav>
        </div>
    );
};

export default Header;