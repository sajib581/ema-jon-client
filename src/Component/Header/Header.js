import React, { useContext } from 'react';
import { a, Link, useHistory } from 'react-router-dom';
import logo from '../../../src/simple-resources/images/logo.png'
import { UserContext } from '../../App';
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory()
    const logOutHandeler = () =>{
        setLoggedInUser({isSignedIn: false,
            name: '',
            email: '',
            image: ''})
        localStorage.removeItem("userInfo")
        history.push("/")
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
                        <button onClick={()=> history.push("/login")} className="btn-brand">LogIn</button>
                }
                
                
            </nav>
        </div>
    );
};

export default Header;