import React from 'react';
import { API } from '../config';

/**
 * @usedBy components/CardForProduct.js
 * @RequestTo router.get('/product/send-product-photo/:productId', sendProductPhoto); in back-end
 * @description redestructure item, url
 */
const DisplayProductImage = ({ item, url }) => (
  <div className='product-img'>
    <img
      src={`${API}/${url}/send-product-photo/${item._id}`}
      alt={item.name}
      className='mb-3'
      style={{ maxHeight: '100%', maxWidth: '100%' }}
    />
  </div>
);

export default DisplayProductImage;
