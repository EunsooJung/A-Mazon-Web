/**
 * @description
 * @requestedFrom Routes.js
 */
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { isAuthenticated } from '../auth';
import { listOrders } from './adminApi';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  //

  useEffect(() => {
    loadOrders();
    //
  }, []);

  const noOrders = orders => {
    return orders.length < 1 ? <h4>No orders!</h4> : null;
  };

  //

  return (
    <Layout
      title='Orders'
      description={`Dear ${user.name}, Manage your orders!`}
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-md8 offset-md-2'>
          {noOrders(orders)}
          {JSON.stringify(orders)}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
