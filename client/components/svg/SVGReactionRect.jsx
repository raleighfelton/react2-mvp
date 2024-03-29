import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sv from '../../utils/styleVariables';
import { normalizeRating } from '../../utils/graphHelpers';

const propTypes = {
  addReaction: PropTypes.func,
  graphLineHeight: PropTypes.number,
  graphLineTop: PropTypes.number,
  width: PropTypes.number,
  yScale: PropTypes.func
};

class SVGReactionRect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDown: false,
      isMoving: false,
      downPositionY: 0,
      moveDeltaY: 0
    };
    this.onDown = this.onDown.bind(this);
    this.onUp = this.onUp.bind(this);
    this.onMove = this.onMove.bind(this);
    this.setPosition = this.setPosition.bind(this);

    this.wasUsingSpecialKeys = false;
  }

  componentDidMount() {
    // Mouse Events
    document.addEventListener('mousemove', this.onMove);
    document.addEventListener('mouseup', this.onUp);
    // Touch Events
    document.addEventListener('touchmove', this.onMove);
    document.addEventListener('touchend', this.onUp);
  }

  componentWillUnmount() {
    // Mouse Events
    document.removeEventListener('mousemove', this.onMove);
    document.removeEventListener('mouseup', this.onUp);
    // Touch Events
    document.removeEventListener('touchmove', this.onMove);
    document.removeEventListener('touchend', this.onUp);
  }

  onDown(e) {
    const pt = (e.changedTouches && e.changedTouches[0]) || e;
    this.setPosition(pt.clientY);
  }

  onUp() {
    if (this.state.isDown) {
      this.setState({ isDown: false, isMoving: false });
    }
  }

  onMove(e) {
    if (this.state.isDown) {
      const pt = (e.changedTouches && e.changedTouches[0]) || e;
      const moveDeltaY = pt.clientY - this.state.downPositionY;

      if (moveDeltaY !== this.state.moveDeltaY) {
        this.handleReaction(this.state.downPositionY + moveDeltaY);
      }

      this.setState({
        isMoving: true,
        moveDeltaY
      });
    }
  }

  setPosition(y) {
    this.handleReaction(y);
    this.setState({ isDown: true, isMoving: false, downPositionY: y, moveDeltaY: 0 });
  }

  handleReaction(loc) {
    const { addReaction, graphLineTop, yScale } = this.props;
    const rating = normalizeRating(yScale.invert(parseInt(loc, 10) - graphLineTop));
    addReaction(rating);
  }

  render() {
    const { graphLineHeight, width } = this.props;

    return (
      <rect
        width={width}
        height={graphLineHeight + (sv.vars.spacingMD * 2)}
        x={0}
        y={-sv.vars.spacingMD}
        style={{ fill: 'rgba(20, 20, 21, 0.001)' }}
        rx={10}
        // onKeyDown={this.handleKeyDown}
        // onKeyUp={this.disengage}
        onMouseDown={this.onDown}
        onTouchStart={this.onDown}
        // onMouseMove={this.movementTracking}
        // onMouseUp={this.up}
        // onClick={(e) => {this.handleReaction(e.nativeEvent.offsetY)}}
      />
    );
  }
}

SVGReactionRect.propTypes = propTypes;

export default SVGReactionRect;
