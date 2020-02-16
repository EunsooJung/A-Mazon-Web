import React from 'react';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { PageHeader } from 'antd';
import { render } from '@testing-library/react';

const Header = () => <div> This is Header </div>;

export default withRouter(Header);
