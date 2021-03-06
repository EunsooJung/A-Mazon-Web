import React from 'react';
import Menu from './Menu';
import '../styles.css';

/** To display dynamically using props with default value */
const Layout = ({
  title = 'Title',
  description = 'Description',
  className,
  children
}) => (
  <div>
    <Menu />
    <div className='jumbotron'>
      <h2 className='jumbotron-font-color'>{title}</h2>
      <p className='lead'>{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
