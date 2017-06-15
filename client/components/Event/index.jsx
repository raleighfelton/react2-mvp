import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import client from 'socket.io-client';
// Socket!
const socket = client('http://192.168.1.169:3000');
// const socket = client('http://localhost:3000');

import fullViewportHOC from '../fullViewportHOC';
import Comparing from '../Comparing';
import Reacting from '../Reacting';

const propTypes = {
  avatar: PropTypes.string,
  hashtag: PropTypes.string,
  negativePercentage: PropTypes.number,
  positivePercentage: PropTypes.number,
  totalUsers: PropTypes.number,
  user: PropTypes.object
};

// This is going to be the new container for the things
class Event extends Component {
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

    socket.on('new user', this.createUser);
    socket.on('connected users', this.update);
  }

  componentDidMount() {
    if (!this.props.user) {
      socket.emit('new user');
    }
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
      <div>
        <Route path="/reacting" render={() => <Reacting {...props} />} />
        <Route path="/compare" render={() => <Comparing {...props} />} />
      </div>
    );
  }
}

Event.propTypes = propTypes;

export default fullViewportHOC(Event);
