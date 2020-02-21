/**
 * Cart Component
 * @usedIn Routes component
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import { getAllItemsInCart } from './cartHelpers';
import Card from '../CardForProduct';
import Checkout from './CheckoutProductInCart';

import { Icon } from 'antd';
import Item from 'antd/lib/list/Item';

const CartLanding = () => {
  const [items, setItems] = useState([]);
  // Cart component about the change so that we can run useEffect.
  // Most importantly avoid infinit loop.
  const [run, setRun] = useState(false);

  // useEffect i pass run so that useEffect will
  // only update component when run state changes
  useEffect(() => {
    setItems(getAllItemsInCart());
  }, [run]);

  // pass the run and setRun to Card component as props
  const showItems = items => {
    return (
      <div>
        <h2>
          <Icon type='shopping' theme='twoTone' twoToneColor='#eb2f96' /> Your
          cart has {`${items.length}`} Items
        </h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const showNoItemsMsg = () => (
    <h2>
      Your cart is empty. <br /> <Link to='/shop'>Continue Shopping</Link>
    </h2>
  );

  return (
    <Layout
      title='Shopping Cart'
      description='Manage your cart items. Add remove checkout or continue shopping.'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-6'>
          {items.length > 0 ? showItems(items) : showNoItemsMsg()}
        </div>

        <div className='col-6'>
          <h2 className='mb-4'>Your cart summary</h2>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default CartLanding;
