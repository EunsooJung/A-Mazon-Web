/**
 * @Associate with Home.js
 */

import { API } from '../config';

/**
 * Get all products
 * @RequestedBy  @method loadProductBySell, @method loadProductByArrival in Home.js
 * @RequestTo router.get('/products, list) in routes/productsRoutes.js back-end
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
