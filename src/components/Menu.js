import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { getTotalItemsInCart } from './cart/cartHelpers';

import { Icon } from 'antd';
import './css/icons.css';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' };
  } else {
    return { color: '#ffffff' };
  }
};

const Menu = ({ history }) => (
  <ul className='nav nav-tabs bg-primary icon-size'>
    <li className='nav-item'>
      <Link className='nav-link' style={isActive(history, '/')} to='/'>
        <Icon type='home' /> Home
      </Link>
    </li>

    <li className='nav-item'>
      <Link className='nav-link' style={isActive(history, '/shop')} to='/shop'>
        <Icon type='shop' /> Shop
      </Link>
    </li>

    <li className='nav-item'>
      <Link className='nav-link' style={isActive(history, '/cart')} to='/cart'>
        <Icon type='cart' />
        Cart{' '}
        <sup>
          <small className='cart-badge'>{getTotalItemsInCart()}</small>
        </sup>
      </Link>
    </li>

    {/*  */}
    {isAuthenticated() && isAuthenticated().user.role === 0 && (
      <li className='nav-item icon-size'>
        <Link
          className='nav-link'
          style={isActive(history, '/user/user-dashboard')}
          to='/user/user-dashboard'
        >
          <Icon type='dashboard' /> User Dashboard
        </Link>
      </li>
    )}

    {isAuthenticated() && isAuthenticated().user.role === 1 && (
      <li className='nav-item icon-size'>
        <Link
          className='nav-link'
          style={isActive(history, '/admin/admin-dashboard')}
          to='/admin/admin-dashboard'
        >
          <Icon type='dashboard' /> Admin Dashboard
        </Link>
      </li>
    )}

    {!isAuthenticated() && (
      <Fragment>
        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive(history, '/signin')}
            to='/signin'
          >
            {' '}
            <Icon type='login' />
            Signin
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive(history, '/signup')}
            to='/signup'
          >
            {' '}
            <Icon type='up-circle' /> Signup
          </Link>
        </li>
      </Fragment>
    )}

    {isAuthenticated() && (
      <li className='nav-item'>
        <span
          className='nav-link'
          style={{ cursor: 'pointer', color: '#ffffff' }}
          onClick={() => {
            signout(() => {
              history.push('/');
            });
          }}
        >
          {' '}
          <Icon type='logout' /> Sign-Out
        </span>
      </li>
    )}
  </ul>
);

export default withRouter(Menu);
