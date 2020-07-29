import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Users}></Route>
        <Route exact path='/places/new' component={NewPlace}></Route>
      </Switch>
    </Router>
  );
};

export default App;
