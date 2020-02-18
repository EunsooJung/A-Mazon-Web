/**
 * @UsedBy @Compoent Home.js
 */
import React from 'react';
import { Link } from 'react-router-dom';
import DisplayProductImage from './DisplayProductImage';

const CardForProduct = ({ product }) => {
  return (
    <div className='col-4 mb-3'>
      <div className='card'>
        <div className='card-header'>{product.name}</div>
        <div className='card-body'>
          <DisplayProductImage item={product} url='product' />
          <p>{product.description}</p>
          <p>{product.price}</p>
          <Link to='/'>
            <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
              View Product
            </button>
          </Link>
          <button className='btn btn-outline-warning mt-2 mb-2 mr-2'>
            Add to Card by User
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardForProduct;
