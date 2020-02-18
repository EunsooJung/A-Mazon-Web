import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './adminApi';

const AddProduct = () => {
  // Define product object state using useState hooks then initialize product object state.
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
  });

  // destructure
  const { user, token } = isAuthenticated();

  // Destructuring because easy to use into the form
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;

  // load categories and set form data
  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData()
        });
      }
    });
  };

  /** useEffect hooks
   * It is kinde of replacement to lifecyle methods.
   * It will be use in class component.
   * Form data to be available as soon as the component mounts
   */
  useEffect(() => {
    // ...values mean grap rest of data
    // setValues({ ...values, formData: new FormData() });
    init();
  }, []);

  /** Define handleChange using higher order function
   * grab the name and it will return another event function ?
   */
  const handleChange = name => event => {
    // Many input fileds --> just one object
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const addProductSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    createProduct(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          quantity: '',
          loading: false,
          createdProduct: data.name
        });
      }
    });
  };

  // Create new product form
  const postNewProductForm = () => (
    <form className='mb-3' onSubmit={addProductSubmit}>
      <h4>Display Product</h4>
      <div className='form-group'>
        <label className='btn btn-secondary'>
          <input
            onChange={handleChange('photo')}
            type='file'
            name='photo'
            accept='image/*'
          />
        </label>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          value={name}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Description</label>
        <textarea
          onChange={handleChange('description')}
          className='form-control'
          value={description}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Price</label>
        <input
          onChange={handleChange('price')}
          type='number'
          className='form-control'
          value={price}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Category</label>
        <select onChange={handleChange('category')} className='form-control'>
          <option>Select Category</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
          {/* <option value='5e4a2ce63cc7288b8cdb68bd'>Books</option>
          <option value='5e4a2ce63cc7288b8cdb68bd'>Music</option> */}
        </select>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Shipping</label>
        <select onChange={handleChange('shipping')} className='form-control'>
          <option>Please select</option>
          <option value='0'>No</option>
          <option value='1'>Yes</option>
        </select>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Quantity</label>
        <input
          onChange={handleChange('quantity')}
          type='number'
          className='form-control'
          value={quantity}
        />
      </div>

      <button className='btn btn-outline-primary'>Create Product</button>
    </form>
  );

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: createdProduct ? '' : 'none' }}
    >
      <h2>{`${createdProduct}`} is created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Layout
      title='Add a new product'
      description={`Admin ${user.name}, Are you ready to add a new product ?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {postNewProductForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
