import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './salesApi';
import CardForProduct from './CardForProduct';

const Home = () => {
  // react useState hooks
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductBySell = () => {
    // sortBy sold
    getProducts('sold').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductByArrival = () => {
    // sortBy createdAt
    getProducts('createdAt').then(data => {
      // if this point has 'Unhandled Rejection (TypeError)', check the salesApi.js
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  // When components load (mount) at first, check states ?
  useEffect(() => {
    loadProductByArrival();
    loadProductBySell();
  }, []);

  return (
    <Layout
      title='Welcome to Online Marketplace!'
      description='Online Marketplace v1.x'
      className='container-fluid'
    >
      <h4 className='mb-4'> Best Sellers</h4>
      <div className='row'>
        {productsBySell.map((product, i) => (
          <CardForProduct key={i} product={product} />
        ))}
      </div>
      <hr />
      <h4 className='mb-4'> New Arrival Products</h4>
      <div className='row'>
        {productsByArrival.map((product, i) => (
          <CardForProduct key={i} product={product} />
        ))}
      </div>
    </Layout>
  );
};
export default Home;
