import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import faker from 'faker';
import client from 'socket.io-client';

const socket = client('http://localhost:3000');

import Comparing from './Comparing';
import Landing from './Landing';
import Reacting from './Reacting';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: faker.internet.avatar(),
      userID: faker.internet.userName(),
      ratings: [],
      users: []
    };

    this.addReaction = this.addReaction.bind(this);
    this.update = this.update.bind(this);

    socket.on('reaction', this.update);
  }

  addReaction(reaction) {
    return () => {
      socket.emit('reaction', { userID: this.state.userID, reaction });
    };
  }

  update(rating) {
    this.setState((oldState) => {
      const newState = {};

      if (rating.userID === oldState.userID) {
        newState.myRating = rating.reaction;
      }

      newState.ratings = oldState.ratings.concat(rating);

      return newState;
    });
  }

  render() {
    const props = {
      ...this.state,
      addReaction: this.addReaction
    };

    return (
      <Router>
        <div className="body">
          <Route exact path="/" render={() => <Landing {...props} />} />
          <Route path="/reacting" render={() => <Reacting {...props} />} />
          <Route path="/compare" render={() => <Comparing {...props} />} />
        </div>
      </Router>
    );
  }
}

export default App;
