/**
 * @component Checkout.js
 * @description Get all the products in Cart, calculate total
 */

import React, { useState, useEffect } from 'react';
import {
  getBraintreeClientToken,
  processPayment,
  createOrder
} from '../salesApi';
import { emptyCart } from '../cart/cartHelpers';
import { isAuthenticated } from '../../auth/';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
/**
 *
 * @param {*} {products}
 * @applied User authenctication
 * @usedIn components/cart/CheckoutProductInCart.js
 */
const CheckoutProductInCart = ({
  products,
  setRun = f => f,
  run = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
        setData({ ...data, error: data.error });
      } else {
        console.log(data);
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const handleAddress = event => {
    setData({ ...data, address: event.target.value });
  };

  // return <div>{JSON.stringify(products)}</div>;
  const getTotalItemsPriceInCart = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0); // 0 is index
  };

  const displayCheckoutInCart = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-primary'>Sign in to checkout</button>
      </Link>
    );
  };

  let deliveryAddress = data.address;

  const buy = () => {
    setData({ loading: true });
    // send the nonce to server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then(data => {
        // console.log(data);
        nonce = data.nonce;
        // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        // and also total to be charged
        // console.log(
        //     "send nonce and total to process: ",
        //     nonce,
        //     getTotalItemsCountinCart(products)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotalItemsPriceInCart(products)
        };

        processPayment(userId, token, paymentData)
          .then(response => {
            console.log(response);

            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress
            };

            createOrder(userId, token, createOrderData)
              .then(response => {
                emptyCart(() => {
                  setRun(!run); // run useEffect in parent Cart
                  console.log('payment success and empty cart');
                  setData({
                    loading: false,
                    success: true
                  });
                });
              })
              .catch(error => {
                console.log(error);
                setData({ loading: false });
              });
          })
          .catch(error => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch(error => {
        // console.log("dropin error: ", error);
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className='gorm-group mb-3'>
            <label className='text-muted'>Delivery address:</label>
            <textarea
              onChange={handleAddress}
              className='form-control'
              value={data.address}
              placeholder='Type your delivery address here...'
            />
          </div>

          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: 'vault'
              }
            }}
            onInstance={instance => (data.instance = instance)}
          />
          <button onClick={buy} className='btn btn-success btn-block'>
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = error => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = success => (
    <div
      className='alert alert-info'
      style={{ display: success ? '' : 'none' }}
    >
      Thanks! Your payment was successful!
    </div>
  );

  const showLoading = loading =>
    loading && <h2 className='text-danger'>Loading...</h2>;

  return (
    <div>
      <h2> Total payment: ${getTotalItemsPriceInCart()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {displayCheckoutInCart()}
    </div>
  );
};

export default CheckoutProductInCart;
