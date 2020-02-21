/**
 * @component Checkout.js
 * @description Get all the products in Cart, calculate total
 */

import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { Component } from '../salesApi';
import Card from '../CardForProduct';
import { isAuthenticated } from '../../auth/';
import { Link } from 'react-router-dom';

/**
 *
 * @param {*} {products}
 * @applied User authenctication
 * @usedIn components/cart/CheckoutProductInCart.js
 */
const CheckoutProductInCart = ({ products }) => {
  // return <div>{JSON.stringify(products)}</div>;
  const getTotalItemsCountinCart = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0); // 0 is index
  };

  const displayCheckoutInCart = () => {
    return isAuthenticated() ? (
      <buttton className='btn btn-success'>Checkout</buttton>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-primary'>Sign in to Checkout</button>
      </Link>
    );
  };

  return (
    <div>
      <h2>Total items in Cart: ${getTotalItemsCountinCart()}</h2>
      {displayCheckoutInCart()}
    </div>
  );
};

export default CheckoutProductInCart;
