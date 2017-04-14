import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Comparing from './Comparing';
import Landing from './Landing';
import Reacting from './Reacting';

function App() {
  return (
    <Router>
      <div className="body">
        <Route exact path="/" component={Landing} />
        <Route path="/reacting" component={Reacting} />
        <Route path="/compare" component={Comparing} />
      </div>
    </Router>
  );
}

export default App;
