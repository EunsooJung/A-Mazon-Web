import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './salesApi';

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
    <Layout title='Home Page' description='Full-Stack Dev'>
      {JSON.stringify(productsByArrival)}
      <hr />
      {JSON.stringify(productsBySell)}
    </Layout>
  );
};
export default Home;
