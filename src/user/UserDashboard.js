import React from 'react';
import Layout from '../components/Layout';
import { isAuthenticated } from '../auth';
import { Icon } from 'antd';

const UserDashboard = () => {
  // destructuring to use easly
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  return (
    <Layout
      title='User Dashboard'
      description='Welcome to Optimized ERP! This is an your dashboard!'
      className='container'
    >
      <div className='card mb-5'>
        <h3 className='card-header'>
          <Icon type='profile' theme='twoTone' />
          User Profile
        </h3>
        <ul className='list-group'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{email}</li>
          <li className='list-group-item'>
            {role === 1 ? 'Admin' : 'Registered User'}
          </li>
        </ul>
      </div>

      <div className='card mb-5'>
        <h3 className='card-header'>
          <Icon type='history' />
          User Purchase History
        </h3>
        <ul className='list-group'>
          <li className='list-group-item'>name</li>
          <li className='list-group-item'>email</li>
          <li className='list-group-item'>role</li>
        </ul>
      </div>
    </Layout>
  );
};

export default UserDashboard;
