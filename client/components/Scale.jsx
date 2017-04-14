import React, { Component } from 'react';
import faker from 'faker';
import client from 'socket.io-client';

const socket = client('http://localhost:3000');

class Scale extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: faker.internet.userName(),
      ratings: []
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
    this.setState({
      ratings: this.state.ratings.concat(rating)
    });
  }

  render() {
    console.log(this.state.ratings); // eslint-disable-line no-console

    return (
      <div className="c-scale">
        <div className="c-scale__tick-container" onClick={this.addReaction(100)}>
          <div className="c-scale__tick c-scale__tick--labeled">
            <div className="c-scale__label">+</div>
          </div>
        </div>
        <div className="c-scale__tick-container" onClick={this.addReaction(90)}>
          <div className="c-scale__tick" />
        </div>
        <div className="c-scale__tick-container" onClick={this.addReaction(80)}>
          <div className="c-scale__tick" />
        </div>
        <div className="c-scale__tick-container" onClick={this.addReaction(70)}>
          <div className="c-scale__tick" />
        </div>
        <div className="c-scale__tick-container" onClick={this.addReaction(60)}>
          <div className="c-scale__tick" />
        </div>
        <div className="c-scale__tick-container" onClick={this.addReaction(50)}>
          <div className="c-scale__tick c-scale__tick--labeled">
            <div className="c-scale__label">N</div>
          </div>
        </div>
        <div className="c-scale__tick-container" onClick={this.addReaction(40)}>
          <div className="c-scale__tick" />
        </div>
        <div className="c-scale__tick-container" onClick={this.addReaction(30)}>
          <div className="c-scale__tick" />
        </div>
        <div className="c-scale__tick-container" onClick={this.addReaction(20)}>
          <div className="c-scale__tick" />
        </div>
        <div className="c-scale__tick-container" onClick={this.addReaction(10)}>
          <div className="c-scale__tick" />
        </div>
        <div className="c-scale__tick-container" onClick={this.addReaction(0)}>
          <div className="c-scale__tick c-scale__tick--labeled">
            <div className="c-scale__label">-</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Scale;
