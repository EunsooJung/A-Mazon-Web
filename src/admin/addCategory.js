import React, { useState } from 'react';
import Layout from '../components/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './adminApi';

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
    // if page not reloaded
    setError('');
    // set success by default false
    setSuccess(false);
    // Make request to server api to createCategory (userId, token, category)
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(true);
      } else {
        setError('');
        setSuccess(true);
      }
    });
  };

  /** Create New Category Form */
  const newCategoryForm = () => (
    <form onSubmit={createNewCategorySubmit}>
      <div className='form-group'>
        <label className='text-muted'>Category name: </label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className='btn btn-outline-primary'>Create Category</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className='text-success'>Category name: {name} is created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className='text-danger'>Category should be unique</h3>;
    }
  };

  const goBack = () => (
    <div className='mt-5'>
      <Link to='/admin/admin-dashboard' className='text-warning'>
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title='Add a new category'
      description={`Admin ${user.name}, Are you ready to add a new category ?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
