import React from 'react';
/** Wrap the rest of the application routes, make props available to
 * other nested components
 */
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignUp from './user/SignUp';
import SignIn from './user/SignIn';
import Home from './components/Home';
import PrivateRoute from './auth/privateRoute';
import UserDashboard from './user/UserDashboard';
import AdminRoute from './auth/adminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/addCategory';
import AddProduct from './admin/addProduct';
import Shop from './components/Shop';
import Product from './components/Product';
import CartLanding from './components/cart/CartLanding';
import Orders from './admin/Orders';
import Profile from './user/Profile';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/updateCategory';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/shop' exact component={Shop} />
        <Route path='/signin' exact component={SignIn} />
        <Route path='/signup' exact component={SignUp} />
        <PrivateRoute
          path='/user/user-dashboard'
          exact
          component={UserDashboard}
        />
        <AdminRoute
          path='/admin/admin-dashboard'
          exact
          component={AdminDashboard}
        />
        <AdminRoute path='/create/category' exact component={AddCategory} />
        <AdminRoute path='/create/product' exact component={AddProduct} />
        <Route path='/product/:productId' exact component={Product} />
        <Route path='/cart' exact component={CartLanding} />
        <AdminRoute path='/admin/orders' exact component={Orders} />
        <PrivateRoute path='/profile/:userId' exact component={Profile} />
        <AdminRoute path='/admin/products' exact component={ManageProducts} />
        <AdminRoute
          path='/admin/product/update/:productId'
          exact
          component={UpdateProduct}
        />
        <AdminRoute
          path='/admin/category/update/:categoryId'
          exact
          component={UpdateCategory}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
