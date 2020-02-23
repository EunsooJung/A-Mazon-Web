/**
 * @Associate with Home.js
 */

import { API } from '../config';
import queryString from 'query-string';

/**
 * Get all products
 * @RequestedBy  @method loadProductBySell, @method loadProductByArrival in Home.js
 * @RequestTo router.get('/products, list) in routes/productsRoutes.js back-end
 * @usedBy ./Home.js
 */
export const getProducts = sortBy => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @description get all categories call to backend
 * @usedBy components/shop.js, Search.js
 */
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @description
 * @usedBy ./Shop.js
 * @requestType POST
 * @requestTo router.post('/products/by/search', searchProductsList); back-end
 */
export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters
  };
  return fetch(`${API}/products/by/search`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

/**
 * @description
 * @usedBy ./Search.js
 * @requestType POST
 * @requestTo router.post('/products/by/search', searchProductsList); back-end
 */
export const list = params => {
  const query = queryString.stringify(params);
  console.log('query', query);
  return fetch(`${API}/products/search?${query}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @description
 * @usedBy ./Product.js
 * @requestType POST
 * @requestTo router.get('/product/:productId', read);
 */
export const read = productId => {
  return fetch(`${API}/product/${productId}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @description
 * @usedBy ./Product.js
 * @requestType POST
 * @requestTo router.get('/products/related/:productId', relatedProductList);
 */
export const listRelated = productId => {
  return fetch(`${API}/products/related/${productId}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 *
 * @param {*} userId
 * @param {*} token
 * @requestTo router.get('/braintree/getToken/:userId', requireSignin, isAuth, generateToken); back-end
 * @usedIn components/cart/CheckoutProductInCart.js
 */
export const getBraintreeClientToken = (userId, token) => {
  return fetch(`${API}/braintree/getToken/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 *
 * @param {*} userId
 * @param {*} token
 * @param {*} paymentData
 */
export const processPayment = (userId, token, paymentData) => {
  return fetch(`${API}/braintree/payment/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(paymentData)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 *
 * @param {*} userId
 * @param {*} token
 * @param {*} createOrderData
 * @usedIn components/cart/CheckoutProductInCart.js
 * @requestTo router.post('/order/create/:userId', requireSignin, isAuth, createOrder); back-end
 */
export const createOrder = (userId, token, createOrderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ order: createOrderData })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
