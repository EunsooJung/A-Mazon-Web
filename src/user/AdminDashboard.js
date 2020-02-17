import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { isAuthenticated } from '../auth';
import { Icon } from 'antd';

const AdminDashboard = () => {
  // destructuring to use easly
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  // Link to Admin's Cart and Admin Profile
  const adminLinks = () => {
    return (
      <div className='cad'>
        <h4 className='card-header'>Admin Links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/create/category'>
              Create Category
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/create/product'>
              Create Product
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
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

  return (
    <Layout
      title={`${name}'s Dashboard `}
      description={`Welcome to Optimized ERP! Manage your profile and product categories !`}
      className='container-fluid'
    >
      <div className='row'>
        {/* Left side frame */}
        <div className='col-3'>{adminLinks()}</div>
        {/* Right side frame */}
        <div className='col-9'>{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
