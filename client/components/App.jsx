import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import client from 'socket.io-client';

const socket = client();
// const socket = client('http://192.168.0.4:3000');
// const socket = client('http://192.168.1.169:3000');

import Comparing from './Comparing';
import Landing from './Landing';
import Reacting from './Reacting';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      myRatings: [],
      userRatings: [],
      reaction: 0
    };

    this.addReaction = this.addReaction.bind(this);
    this.createUser = this.createUser.bind(this);
    this.update = this.update.bind(this);

    socket.emit('new user');
    socket.on('new user', this.createUser);
    socket.on('connected users', this.update);
  }

  addReaction(reaction) {
    this.setState((oldState) => {
      socket.emit('reaction', { id: this.state.id, value: reaction });
      return {
        reaction,
        myRatings: oldState.myRatings.concat(reaction)
      };
    });
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
      addReaction: this.addReaction,
      negativePercentage: 45,
      positivePercentage: 56,
      totalUsers: 124
    };

    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Landing {...props} />} />
          <Route path="/reacting" render={() => <Reacting {...props} />} />
          <Route path="/compare" render={() => <Comparing {...props} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
