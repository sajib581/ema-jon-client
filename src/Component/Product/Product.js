import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar} from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom';

const Product = ({ product, handelAddProduct, showAddToCart }) => {
    const { name, img, seller, price, stock, key, star, features } = product


    const starBag = [] ;
    for (let i = 1; i<=5; i++){
        starBag.push(i<=star ? <FontAwesomeIcon style={{color:"orange"}} key={i} icon={faStar} /> : <FontAwesomeIcon style={{color:"lightGrey"}} key={i} icon={faStar} />)
    }
    return (
        <div className="product">
            <div className="pr-3 d-flex">
                <img style={{ width: "200px" }} src={img} alt="" />
            </div>
            <div className="product-description">
                <h5 className="product-name"><Link to={"/product/" + key}>{name}</Link> </h5> <br />
                <div className="d-flex">
                    <div>
                        <p><small>by: {seller}</small></p>
                        <p>${price}</p>
                        <p><small>Only {stock} left in stock - Order Soon</small></p>
                        {
                            showAddToCart && <button onClick={() => handelAddProduct(product)} className="main-button" ><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
                        }
                    </div>
                    <div className="ml-5">
                        {
                           starBag.map((star, key) => star)   
                        }
                        <strong><h6>Features</h6></strong>
                        <ul>
                            {
                                features.map((feature,key) => <li>{`${feature.description}:${feature.value}`}</li> )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;