/**
 * @UsedBy @Compoent Home.js, Shop.js
 */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import DisplayProductImage from './DisplayProductImage';
import moment from 'moment';
import {
  addItemToCart,
  updateCartItem,
  removeItemInCart
} from './cart/cartHelpers';

import '../App.css';

const CardForProduct = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  showRemoveProductButton = false,
  // Card component accept the props from CartLanding component
  cartUpdate = false,
  setRun = f => f, // default value of function
  run = undefined // default value of undefine
}) => {
  //
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  //
  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className='mr-2'>
          <button className='btn btn-outline-primary mr-2 mb-2 card-btn-1'>
            View Product
          </button>
        </Link>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className='badge badge-primary badge-pill'>In Stock </span>
    ) : (
      <span className='badge badge-primary badge-pill'>Out of Stock </span>
    );
  };

  /** Cart Management */

  // Increment/decrement or remove product...in Cart
  // By the setRun, it can run useEffect in parent component > Cart
  const handleCartItemStateChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      // console.log('...cart update!');
      // updatedCartItem(what, how)
      updateCartItem(productId, event.target.value);
    }
  };

  const addToCart = () => {
    addItemToCart(product, setRedirect(true));
  };

  const redirectIsTrue = redirect => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      // if showAddToCartButton is true it will be visible
      // if it is false it will be hidden
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className='btn btn-outline-warning mr-2 mb-2 card-btn-1  '
        >
          Add to cart
        </button>
      )
    );
  };

  /** Increament/Decrement in Cart component */
  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Adjust Quantity</span>
            </div>
            <input
              type='number'
              className='form-control'
              value={count}
              // which product change
              onChange={handleCartItemStateChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItemInCart(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className='btn btn-outline-danger mr-2 mb-2'
        >
          Remove Product
        </button>
      )
    );
  };

  return (
    <div className='card '>
      <div className='card-header card-header-1 name'>{product.name}</div>
      <div className='card-body'>
        {redirectIsTrue(redirect)}
        <DisplayProductImage item={product} url='product' />
        <p className='lead mt-2'>{product.description.substring(0, 100)} </p>
        <p>Price: $ {product.price}</p>
        <p>Category: {product.category && product.category.name}</p>
        <p>Added on {moment(product.createdAt).fromNow()}</p>
        <div>{showStock(product.quantity)}</div>

        <br />
        {/* Use the props */}
        {showViewButton(showViewProductButton)}
        {showAddToCartBtn(showAddToCartButton)}
        {showRemoveButton(showRemoveProductButton)}
        {showCartUpdateOptions(cartUpdate)}
        <br />
      </div>
    </div>
  );
};

export default CardForProduct;
