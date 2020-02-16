import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon } from 'antd';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' };
  } else {
    return { color: '#ffffff' };
  }
};

const Menu = ({ history }) => (
  <ul className='nav nav-tabs bg-primary'>
    <li className='nav-item'>
      <Link className='nav-link' style={isActive(history, '/')} to='/'>
        <Icon type='home' /> Home
      </Link>
    </li>

    <li className='nav-item'>
      <Link
        className='nav-link'
        style={isActive(history, '/signin')}
        to='/signin'
      >
        Signin
      </Link>
    </li>

    <li className='nav-item'>
      <Link
        className='nav-link'
        style={isActive(history, '/signup')}
        to='/signup'
      >
        Signup
      </Link>
    </li>
  </ul>
);

export default withRouter(Menu);
