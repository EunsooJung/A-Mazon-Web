/**
 * Commucate to Server for Admin
 * It will be used by ./admin/addCategory.js, addProduct.js
 */
import { API } from '../config';

/**
 * @description Create Product category by Admin
 * @param {*} userId
 * @param {*} token
 * @param {*} category
 * @requestToBackEnd routes/categoryRoutes.js: router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
 */
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

/**
 * @description Update Category by Admin
 * @param {*} categoryId
 * @param {*} userId
 * @param {*} token
 * @param {*} category
 * @requestToBackEnd categoryRoutes.js: router.put(
  '/category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);
 */
export const updateCategory = (categoryId, userId, token, category) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: 'PUT',
    headers: {
      // content type?
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
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
 *
 * @param {*} categoryId
 * @requestToBackEnd categoryRoutes.js: router.get('/category/:categoryId', read);
 */
export const getCategory = categoryId => {
  return fetch(`${API}/category/${categoryId}`, {
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

/**
 * @description Product Management by Admin
 * @method getProduct Get all products
 * @type GET
 * @requestToBackEnd routes/productRoutes.js: router.get('/products', list);
 */
export const getProducts = () => {
  return fetch(`${API}/products?limit=undefined`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @description Delete product by Admin
 * @param {*} productId
 * @param {*} userId
 * @param {*} token
 * @requestToBackEnd routes/productRoutes.js: router.delete(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
 */
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'DELETE',
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
 * @description Get single product
 * @param {*} productId
 * @requestToBackEnd routes/productRoutes.js: router.get('/product/:productId', read);
 */
export const getProduct = productId => {
  return fetch(`${API}/product/${productId}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @description Update product by admin
 * @param {*} productId
 * @param {*} userId
 * @param {*} token
 * @param {*} product
 * @requestToBackEnd routes/productRoutes.js: router.put(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);
 */
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
