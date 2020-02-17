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

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
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
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
