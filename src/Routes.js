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

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signin' exact component={SignIn} />
        <Route path='/signup' exact component={SignUp} />
        <PrivateRoute path='/user-dashboard' exact component={UserDashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
