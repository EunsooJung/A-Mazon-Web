import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import CardForProduct from './CardForProduct';
import { getCategories } from './salesApi';
import CategoriesCheckBox from './CategoriesCheckBox';

const Shop = () => {
  // store filters in state
  const [categoryFilters, setCategoryFilters] = useState({
    // filters object contians categories and price range
    filters: {
      categories: [],
      price: []
    }
  });
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

  /**
   * @function handleFilters Passing categories filter to parent components using props
   * @arguement1 filters: sending the array of categories and price
   * @argument2 filterBy: either by category or price
   * @usedBy Filter by caterogies in the checkbox to render and ./CategoriesCheckBox
   */
  const handleFilters = (filters, filterBy) => {
    // console.log('Shop: ', filters, filterBy);
    const newFilters = { ...categoryFilters };
    newFilters.filters[filterBy] = filters;
    setCategoryFilters(newFilters);
  };

  return (
    <Layout
      title='Shop Page'
      description='Search and find books of your choice'
      className='container-fluid'
    >
      {/* <Layout
      title='Shop'
      description='You can Search and Buy Everythings!'
      className='container-fluid'
    > */}
      <div className='row'>
        <div className='col-4'>
          <h4>Filter by categories</h4>
          {/* use the props of categories from categories */}
          <ul>
            <CategoriesCheckBox
              categories={categories}
              // filters return handleFilters with filters, 'category' arguments
              handleFilters={filters => handleFilters(filters, 'category')}
            />
          </ul>
        </div>
        <div className='col-8'>
          <h2 className='mb-4'>Products</h2>
          <div className='row'>
            <div className='col-4 mb-3'>{JSON.stringify(categoryFilters)}</div>
          </div>
          <hr />
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
