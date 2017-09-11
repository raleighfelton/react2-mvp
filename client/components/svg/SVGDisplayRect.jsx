import React from 'react';
import PropTypes from 'prop-types';
import sv from '../../utils/styleVariables';

const propTypes = {
  graphLineHeight: PropTypes.number,
  graphLineTop: PropTypes.number,
  yScale: PropTypes.func
};

function SVGDisplayRect({ graphLineHeight }) {
  return (
    <rect
      width={88}
      height={graphLineHeight + (sv.vars.spacingMD * 2)}
      x={0}
      y={-sv.vars.spacingMD}
      style={{ fill: 'rgba(20, 20, 21, 0.9)', boxShadow: '3px 2px 5px rgba(0, 0, 0, 0.2)' }}
      rx={10}
    />
  );
}

SVGDisplayRect.propTypes = propTypes;

export default SVGDisplayRect;
