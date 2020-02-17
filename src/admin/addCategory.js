import React, { useState } from 'react';
import Layout from '../components/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';

const AddCategory = () => {
  // Apply react useState hooks to use  name of the Categories state and initialize default state
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localStorage
  const { user, token } = isAuthenticated();

  /**
   * @function handleChange
   * @argument eventHandler
   */
  const handleChange = e => {
    setError('');
    setName(e.target.value);
  };
  /**
   * @function createNewCategorySubmit
   * @argument eventHandler
   */
  const createNewCategorySubmit = e => {
    // prevent default behavior
    e.preventDefault();
    // page not reloaded
    setError('');
    // set success by default false
    setSuccess(false);
    // Make request to server api to createCategory
  };

  /** Create New Category Form */
  const newCategoryForm = () => (
    <form onSubmit={createNewCategorySubmit}>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <Button className='btn btn-outline-primary'>Create Category</Button>
    </form>
  );

  return (
    <Layout
      title='Add a new category'
      description={`Admin ${name}, Are you ready to add a new category ?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>{newCategoryForm()}</div>
      </div>
    </Layout>
  );
};

export default AddCategory;
