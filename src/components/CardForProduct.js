/**
 * @UsedBy @Compoent Home.js, Shop.js
 */
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import DisplayProductImage from './DisplayProductImage';
import moment from 'moment';
import { addItem } from './cart/cartHelpers';

const CardForProduct = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  showRemoveProductButton
}) => {
  const [redirect, setRedirect] = useState(false);

  //
  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className='mr-2'>
          <button type='button' className='btn btn-outline-primary mr-2 mb-2'>
            View Product
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const redirectIsTrue = redirect => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className='btn btn-outline-warning mt-2 mb-2 card-btn-1  '
        >
          Add to cart
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className='badge badge-primary badge-pill'>In Stock</span>
    ) : (
      <span className='badge badge-primary badge-pill'>Out of Stock</span>
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button onClick={() => {}} className='btn btn-outline-danger mt-2 mb-2'>
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

        {showViewButton(showViewProductButton)}

        {showAddToCartBtn(showAddToCartButton)}

        {showRemoveButton(showRemoveProductButton)}

        <br />
      </div>
    </div>
  );
};

export default CardForProduct;
