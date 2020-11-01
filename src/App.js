import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import './App.css';
import MainNav from './shared/components/Navigation/MainNav';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hooks';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route exact path='/' component={Users}></Route>
        <Route exact path='/:userId/places' component={UserPlaces}></Route>
        <Route exact path='/places/new' component={NewPlace}></Route>
        <Route exact path='/places/:placeId' component={UpdatePlace}></Route>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path='/' component={Users}></Route>
        <Route exact path='/:userId/places' component={UserPlaces}></Route>
        <Route exact path='/auth' component={Auth}></Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        userId: userId,
      }}
    >
      <Router>
        <MainNav></MainNav>
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
