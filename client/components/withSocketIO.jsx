import throttle from 'lodash/throttle';
import React from 'react';
import client from 'socket.io-client';

const address = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const socket = client(address, { secure: window.location.protocol === 'https' });

const emitReaction = throttle(function(id, reaction) {
  socket.emit('reaction', { id, value: reaction });
}, 200);

// This function takes a component...
export default function withSocketIO(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        connected: false,
        myRatings: [],
        userRatings: [],
        reaction: 0
      };

      this.addReaction = this.addReaction.bind(this);
      this.update = this.update.bind(this);
    }

    componentDidMount() {
      socket.open();
      socket.on('connected users', this.update);
    }

    componentWillUnmount() {
      socket.removeAllListeners('connected users');
      socket.close();
    }

    addReaction(reaction) {
      this.setState((oldState) => {
        emitReaction(this.props.id, reaction);

        return {
          reaction,
          myRatings: oldState.myRatings.concat(reaction)
        };
      });
    }

    update(userRatings) {
      this.setState(() => {
        return { userRatings };
      });
    }

    render() {
      const props = {
        ...this.props,
        ...this.state,
        addReaction: this.addReaction
      };

      return (
        <WrappedComponent
          {...props}
        />
      );
    }
  };
}
