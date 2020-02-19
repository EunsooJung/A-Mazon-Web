/**
 * @UsedBy @Compoent Home.js, Shop.js
 */
import React from 'react';
import { Link } from 'react-router-dom';
import DisplayProductImage from './DisplayProductImage';

const CardForProduct = ({ product }) => {
  return (
    <div className='card '>
      <div className='card-header card-header-1 '>{product.name}</div>
      <div className='card-body'>
        {/* {shouldRedirect(redirect)} */}
        <DisplayProductImage item={product} url='product' />
        <p className='card-p  mt-2'>{product.description.substring(0, 100)} </p>
        <p className='card-p black-10'>$ {product.price}</p>
        <p className='black-9'>
          Category: {product.category && product.category.name}
        </p>
        <p className='black-8'>
          {/* Added on {moment(product.createdAt).fromNow()} */}
        </p>
        {/* {showStock(product.quantity)} */}
        <br />

        {/* {showViewButton(showViewProductButton)}

        {showAddToCartBtn(showAddToCartButton)}

        {showRemoveButton(showRemoveProductButton)}

        {showCartUpdateOptions(cartUpdate)} */}
      </div>
    </div>
  );
};

export default CardForProduct;
