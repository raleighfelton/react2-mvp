import throttle from 'lodash/throttle';
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import client from 'socket.io-client';
import axios from 'axios';

const address = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
// const socket = client('http://192.168.0.4:3000');
// const socket = client('http://192.168.1.169:3000');

const socket = client(address);

const emitReaction = throttle(function(id, reaction) {
  socket.emit('reaction', { id, value: reaction });
}, 200);

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
    this.initUser = this.initUser.bind(this);
    this.update = this.update.bind(this);

    socket.on('new user', this.createUser);
    socket.on('connected users', this.update);
  }

  componentDidMount() {
    axios.get('/api/profile')
      .then(({ data }) => {
        this.initUser(data.user);
      })
      .catch(() => {
        this.initUser();
      });
  }

  addReaction(reaction) {
    this.setState((oldState) => {
      emitReaction(this.state.id, reaction);

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
      handle: user.handle,
      id: user._id,
      name: user.name,
      color: user.profileBackgroundColor,
      reaction: user.reaction
    });
  }

  initUser(u) {
    socket.emit('new user', u);
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
      initUser: this.initUser,
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
