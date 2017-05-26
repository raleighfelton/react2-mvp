import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import client from 'socket.io-client';

const socket = client('http://localhost:3000');

import Comparing from './Comparing';
import Landing from './Landing';
import Reacting from './Reacting';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      userRatings: []
    };

    this.addReaction = this.addReaction.bind(this);
    this.createUser = this.createUser.bind(this);
    this.update = this.update.bind(this);

    socket.emit('new user');
    socket.on('new user', this.createUser);
    socket.on('connected users', this.update);
  }

  addReaction(reaction) {
    return () => {
      socket.emit('reaction', { id: this.state.id, value: reaction });
      this.setState(() => {
        return { reaction };
      });
    };
  }

  createUser(user) {
    this.setState({
      avatar: user.avatar,
      connected: true,
      id: user._id,
      reaction: user.reaction
    });
  }

  update(userRatings) {
    this.setState(() => {
      return { userRatings };
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
