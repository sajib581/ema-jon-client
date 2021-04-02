import useLocalStorageState from 'use-local-storage-state'
import './App.css';
import Header from './Component/Header/Header';
import Shop from './Component/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './Component/Review/Review';
import Inventory from './Component/Inventory/Inventory';
import PageNotFound from './Component/PageNotFound/PageNotFound';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import Login from './Component/Login/Login';
import Shipment from './Component/Shipment/Shipment';
import { createContext, useEffect, useState } from 'react';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import { getDatabaseCart, getDataKey } from './simple-resources/utilities/databaseManager';

export const UserContext = createContext();
export const CartContext = createContext();

function App() {
  const cartValueArray = Object.values(getDatabaseCart()) 
  const totalNumberCart = cartValueArray.reduce((total, value) => total + value, 0)

  const [totalCart, setTotalCart] = useState(totalNumberCart)
  const [loggedInUser, setLoggedInUser] = useLocalStorageState('userInfo', {
    isSignedIn: false,
    name: '',
    email: '',
    image: ''
  })
  const [products, setProducts] = useState([])

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser, products, setProducts, totalCart, setTotalCart]}>      
        <Router>
          <Header></Header>
          <div>
            <Switch>
              <Route path="/shop">
                <Shop></Shop>
              </Route>
              <Route path="/review">
                <Review></Review>
              </Route>
              <Route path="/inventory">
                <Inventory></Inventory>
              </Route>
              <Route path="/login">
                <Login></Login>
              </Route>
              <PrivateRoute path="/shipment">
                <Shipment></Shipment>
              </PrivateRoute>
              <Route exact path="/">
                <Shop></Shop>
              </Route>
              <Route path="/product/:productId">
                <ProductDetails></ProductDetails>
              </Route>
              <Route path="*">
                <PageNotFound></PageNotFound>
              </Route>
            </Switch>
          </div>
        </Router>
    </UserContext.Provider>
  );
}

export default App;
