import React, { Component } from 'react';
import sv from '../../utils/styleVariables';
import { normalizeRating } from '../../utils/graphHelpers';

class SVGReactionRect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loc: 0,
      engaged: false
    };
    this.disengage = this.disengage.bind(this);
    this.engage = this.engage.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleReaction = this.handleReaction.bind(this);
    this.movementTracking = this.movementTracking.bind(this);
  }

  disengage() {
    this.setState({
      engaged: false
    });
  }

  engage() {
    this.setState({
      engaged: true
    });
  }

  handleKeyDown(e) {
    switch(e.which) {
    case 38: // up
    case 39: // right {}
      this.setState((oldState) => {
        const loc = oldState.loc + 1;
        this.handleReaction(loc)
        return { loc, engaged: true };
      });
    case 37: // left
    case 40: // down
      this.setState((oldState) => {
        const loc = oldState.loc - 1;
        this.handleReaction(loc)
        return { loc, engaged: true };
      });
    }
  }

  handleReaction(loc) {
    const { addReaction, graphLineTop, yScale } = this.props;
    const rating = normalizeRating(yScale.invert(parseInt(loc, 10) - graphLineTop));
    addReaction(rating);
  }

  movementTracking(e) {
    const loc = e.nativeEvent.offsetY;
    if (this.state.engaged) {
      this.handleReaction(loc);
    }
    this.setState({ loc });
  }

  render() {
    const { graphLineHeight } = this.props;

    return (
      <rect
        width={88}
        height={graphLineHeight + (sv.vars.spacingMD * 2)}
        x={0}
        y={-sv.vars.spacingMD}
        style={{ fill: 'rgba(20, 20, 21, 0.9)', boxShadow: '3px 2px 5px rgba(0, 0, 0, 0.2)' }}
        rx={10}
        // onKeyDown={this.handleKeyDown}
        // onKeyUp={this.disengage}
        // onMouseDown={this.engage}
        // onMouseMove={this.movementTracking}
        // onMouseUp={this.disengage}
        onClick={(e) => {this.handleReaction(e.nativeEvent.offsetY)}}
      />
    );
  }
}

export default SVGReactionRect;
