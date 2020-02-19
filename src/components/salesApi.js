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
