import React from 'react';
import { a } from 'react-router-dom';
import logo from '../../../src/simple-resources/images/logo.png'
import './Header.css'

const Header = () => {
    return (
        <div className="header">
            <img  src={logo} alt=""/>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/manage">Manage Inventory</a>
            </nav>
        </div>
    );
};

export default Header;