import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { isAuthenticated } from '../auth';
import { Icon } from 'antd';

const UserDashboard = () => {
  // destructuring to use easly
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  // Link to User's Cart and User Profile
  const userLinks = () => {
    return (
      <div className='cad'>
        <h4 className='card-header'>User Links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/cart'>
              My Cart
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/profile/update'>
              Profile Update
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
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
    );
  };

  const userPurchaseHistory = () => {
    return (
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
    );
  };

  return (
    <Layout
      title={`${name}'s Dashboard `}
      description={`Welcome to Optimized ERP! Manage your profile and purchased history !`}
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-3'>{userLinks()}</div>
        <div className='col-9'>
          {userInfo()}
          {userPurchaseHistory()}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
