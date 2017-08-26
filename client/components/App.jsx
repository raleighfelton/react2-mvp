import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Comparing from './Comparing';
import Landing from './Landing';
import Reacting from './Reacting';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Landing />} />
        <PrivateRoute path="/reacting" component={Reacting} />
        <PrivateRoute path="/compare" component={Comparing} />
      </Switch>
    </Router>
  );
}

export default App;
