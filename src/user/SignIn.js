import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import { signin, authenticate, isAuthenticated } from '../auth';

import 'antd/dist/antd.css';

import { Form, Input, Button } from 'antd';

const SignIn = () => {
  // Apply useState hooks to get data from the ui, it will be bind to submit event handler
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // ...
  // instead of use object the initialize default value
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false
  });

  // To get the signin data, we can destructure states
  const { email, password, error, loading, redirectToReferrer } = values;

  // If user is authentidcated user, destructuring user to redirect dashboard
  const { user } = isAuthenticated();
  // To handle the states change status (higher order function), it returning another function)
  // blows, name is function, event is returning fuction
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  // click event handler
  const signInSubmit = event => {
    // The browser doesn't reload when the button is clicked
    event.preventDefault();
    // Destructuring
    setValues({ ...values, error: false, lodading: true });
    // call signin function to get the object data (name, email, password)
    // signin({ email, password });
    signin({ email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, lodading: false });
      } else {
        // setValues({
        //   ...values,
        //   redirectToReferrer: true
        // });
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };

  const signInForm = () => (
    <Form>
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
      <Button onClick={signInSubmit} type='primary' className='btn btn-primary'>
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

  // To show Loading message
  const showLoading = () =>
    loading && (
      <div className='alert alert-info'>
        <h2>Loading...</h2>
      </div>
    );

  // Handle redirection
  const redirectUser = () => {
    if (redirectToReferrer) {
      // return <Redirect to='/' />;
      if (user && user.role === 1) {
        return <Redirect to='/admin/admin-dashboard' />;
      } else {
        return <Redirect to='/user/user-dashboard' />;
      }
    }
    // If user is not a admin but aleady logged in isAuthenticated user, redirect to home
    if (isAuthenticated()) {
      return <Redirect to='/' />;
    }
  };

  return (
    <Layout
      title='Online Marketplace Sign-In'
      description='SignIn to Online Marketplace web application'
      className='container col-md-8 offset-md-2'
    >
      {showLoading()}
      {showError()}
      {signInForm()}
      {redirectUser()}
      {/* To check the states changing status, we can use json.stringity */}
      {/* {JSON.stringify(values)} */}
    </Layout>
  );
};
export default SignIn;
