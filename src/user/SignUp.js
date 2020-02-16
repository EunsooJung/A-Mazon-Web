import React, { useState } from 'react';
import Layout from '../components/Layout';
import { API } from '../config';

import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from 'antd';

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

  // To handle the states change status (higher order function), it returning another function)
  // blows, name is function, event is returning fuction
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const signUpForm = () => (
    <Form>
      <div>
        <label className='text-muted'>Name</label>
        <Input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>email</label>
        <Input
          onChange={handleChange('email')}
          type='email'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>password</label>
        <Input
          onChange={handleChange('password')}
          type='password'
          className='form-control'
        />
      </div>
      <Button type='primary' className='btn btn-primary'>
        Submit
      </Button>
    </Form>
  );

  return (
    <Layout
      title='SignUp'
      description='SignUp to Full-Stack Dev'
      className='container col-md-8 offset-md-2'
    >
      {signUpForm()}
      {/* To check the states changing status, we can use json.stringity */}
      {/* {JSON.stringify(values)} */}
    </Layout>
  );
};
export default SignUp;
