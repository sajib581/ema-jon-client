import React from 'react';
import { a, Link } from 'react-router-dom';
import logo from '../../../src/simple-resources/images/logo.png'
import './Header.css'

const Header = () => {
    return (
        <div className="header">
            <img  src={logo} alt=""/>
            <nav>
                {/* <Link href="/shop">Shop</a> */}
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
            </nav>
        </div>
    );
};

export default Header;