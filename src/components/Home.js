import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './salesApi';
import CardForProduct from './CardForProduct';
import Search from './Search';

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
      description='Node React MongoDB - Online Marketplace App v1.x'
      className='container-fluid'
    >
      <Search />
      <h2 className='mb-4'>Best Sellers</h2>
      <h2 className='mb-4'>New Arrivals</h2>
      <div className='row'>
        {productsByArrival.map((product, i) => (
          <div key={i} className='col-4 mb-3'>
            <CardForProduct product={product} />
          </div>
        ))}
      </div>
      <hr />
      <h4 className='mb-4'> New Arrival Products</h4>
      <div className='row'>
        {productsByArrival.map((product, i) => (
          <div className='col-4 mb-3'>
            <CardForProduct key={i} product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};
export default Home;
