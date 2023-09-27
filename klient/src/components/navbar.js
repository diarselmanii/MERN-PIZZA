import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';

import './navbar.css';

export default function Navbar() {
  const cartstate = useSelector(state => state.cartReducer);
  const userState = useSelector(state => state.loginUserReducer);
  const { currentUser } = userState;
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="custom-navbar">
      <a className="navbar-brand" href="/">
        115's Pizza
      </a>
      <ul className="nav-list">
        {currentUser ? (
          <li className="nav-item dropdown">
            <p ></p>
            <span id='currentUser' className="dropdown-label">{currentUser.name}</span>
            <div className="dropdown-content">
              <a id="span" href="/orders">Orders</a>
              <p ></p>
              <a id="span" href="/offers">Offers</a>
              <p></p>
              <a id="span" href="/csoonpizzas">Cooming Soon</a>
              <p ></p>
              <p id="span" onClick={handleSignout}>Signout</p>
            </div>
          </li>
        ) : (
          <li className="nav-item">
            <a className="nav-link" href="/login" >
              Login
            </a>
          </li>
        )}

        <li className="nav-item">
          <a className="nav-link" id="span" href="/cart">
            Cart {cartstate.cartItems.length}
          </a>
        </li>
      </ul>
    </nav>
  );
}
