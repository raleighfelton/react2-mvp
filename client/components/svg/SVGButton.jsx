import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import sv from '../../utils/styleVariables';

const propTypes = {
  label: PropTypes.string,
  to: PropTypes.string,
  transform: PropTypes.string,
  isSmall: PropTypes.bool,
  noFill: PropTypes.bool
};

class SVGButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkStyle: sv.link,
      buttonBoxStyle: sv.button.box
    };
    this.hover = this.hover.bind(this);
  }

  hover(isHovering) {
    return () => {
      this.setState({
        buttonBoxStyle: {
          fill: isHovering ? sv.vars.buttonFillHover : sv.vars.buttonFill
        }
      });
    };
  }

  render() {
    const { label, to, transform, isSmall, noFill } = this.props;
    const buttonWidth = isSmall ? sv.vars.buttonWidthSM : sv.vars.buttonWidth;
    const buttonStyle = noFill ? { fill: 'none' } : this.state.buttonBoxStyle;

    return (
      <Link
        to={to}
        style={this.state.linkStyle}
        onMouseEnter={this.hover(true)}
        onMouseLeave={this.hover(false)}
      >
        <g transform={transform}>
          <rect
            height={sv.vars.buttonHeight}
            style={buttonStyle}
            width={buttonWidth}
            x={0}
            y={0}
          />
          <text
            x={0}
            y={0}
            dominantBaseline="middle"
            textAnchor="middle"
            transform={`translate(${buttonWidth / 2}, ${sv.vars.buttonHeight / 2})`}
          >
            {label}
          </text>
        </g>
      </Link>
    );
  }
}

SVGButton.propTypes = propTypes;

export default SVGButton;
