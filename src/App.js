import React, { useState, useCallback, useEffect } from 'react';
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

let logoutTimer;

const App = () => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState();

  const login = useCallback((uId, token, expirationDate) => {
    setToken(token);
    setUserId(uId);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); //1000 * 60 * 60 = 1h
    setTokenExpiration(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uId,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken();
    setUserId(null);
    setTokenExpiration(null);
    localStorage.removeItem('userData');
  }, []);

  // Create a time which logout the user when the token expires
  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpiration]);

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem('userData'));
    if (
      storeData &&
      storeData.token &&
      new Date(storeData.expiration) > new Date()
    ) {
      login(storeData.userId, storeData.token, new Date(storeData.expiration));
    }
  }, [login]);

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
