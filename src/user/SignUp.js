import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { signup } from '../auth';

/** Refactoring to auth/index.js
import { API } from '../config';
 */
import 'antd/dist/antd.css';

import { Form, Input, Button } from 'antd';

const SignUp = () => {
  // Apply useState hooks to get data from the ui, it will be bind to submit event handler
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // ...
  // instead of use object the initialize default value
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  });

  // To get the signup data, we can destructure states
  const { name, email, password, error, success } = values;

  // To handle the states change status (higher order function), it returning another function)
  // blows, name is function, event is returning fuction
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  // click event handler
  const signUpSubmit = event => {
    // The browser doesn't reload when the button is clicked
    event.preventDefault();
    // Destructuring
    setValues({ ...values, error: false });
    // call signup function to get the object data (name, email, password)
    // signup({ name, email, password });
    signup({ name, email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true
        });
      }
    });
  };

  const signUpForm = () => (
    <Form>
      <div>
        <label className='text-muted'>Name</label>
        <Input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          value={name}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>email</label>
        <Input
          onChange={handleChange('email')}
          type='email'
          className='form-control'
          value={email}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>password</label>
        <Input
          onChange={handleChange('password')}
          type='password'
          className='form-control'
          value={password}
        />
      </div>
      <Button onClick={signUpSubmit} type='primary' className='btn btn-primary'>
        Submit
      </Button>
    </Form>
  );

  // To show error message
  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  // To show success message
  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: success ? '' : 'none' }}
    >
      New account is created. Please <Link to='/signin'>Signin</Link>
    </div>
  );

  return (
    <Layout
      title='SignUp'
      description='SignUp to Full-Stack Dev'
      className='container col-md-8 offset-md-2'
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
      {/* To check the states changing status, we can use json.stringity */}
      {/* {JSON.stringify(values)} */}
    </Layout>
  );
};
export default SignUp;
