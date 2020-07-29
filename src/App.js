import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import MainNav from './shared/components/Navigation/MainNav';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';

const App = () => {
  return (
    <Router>
      <MainNav></MainNav>
      <main>
        <Switch>
          <Route exact path='/' component={Users}></Route>
          <Route exact path='/places/new' component={NewPlace}></Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
