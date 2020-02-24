/**
 * Commucate to Server for Admin
 * It will be used by ./admin/addCategory.js, addProduct.js
 */
import { API } from '../config';

export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

// create new product api call to backend
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

// get all categories call to backend
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
 * @param {*} userId
 * @param {*} token
 * @usedIn ./Orders.js
 * @requestTo router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrders); back-end
 */
export const listOrders = (userId, token) => {
  return fetch(`${API}/order/list/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
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
 * @usedIn ./Orders.js
 * @requestTo controllers/orderController.js - getStatusValues : back-end
 */
export const getStatusValues = (userId, token) => {
  return fetch(`${API}/order/status-values/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
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
 * @param {*} orderId
 * @param {*} status
 * @usedIn ./Orders.js @method handleStatusChange()
 * @requestTo controllers/orderController.js - exports.updateOrderStatus = (req, res) => { ... : back-end
 */
export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status, orderId })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
