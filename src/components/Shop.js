import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import CardForProduct from './CardForProduct';
import { getCategories } from './salesApi';

const Shop = () => {
  // create react useState Hooks, empty array by default and then bring in categories then setCategories
  const [categories, setCategories] = useState([]);
  // Create react useState Hooks to error
  const [error, setError] = useState(false);

  // load categories
  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Layout
      title='Shop'
      description='You can Search and Buy Everythings!'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-4'>{JSON.stringify(categories)}</div>
        <div className='col-8'>right frame</div>
      </div>
    </Layout>
  );
};

export default Shop;
