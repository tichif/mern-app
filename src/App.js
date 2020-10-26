import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import MainNav from './shared/components/Navigation/MainNav';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNav></MainNav>
        <main>
          <Switch>
            <Route exact path='/' component={Users}></Route>
            <Route exact path='/places/new' component={NewPlace}></Route>
            <Route exact path='/:userId/places' component={UserPlaces}></Route>
            <Route
              exact
              path='/places/:placeId'
              component={UpdatePlace}
            ></Route>
            <Route exact path='/auth' component={Auth}></Route>
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
