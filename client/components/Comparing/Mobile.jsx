import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as scale from 'd3-scale';

import sv from '../../utils/styleVariables';

import SVGGraphTicksY from '../svg/SVGGraphTicksY';
import SentimentGroup from '../svg/SentimentGroup';

const propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
};

function Mobile(props) {
  const { height, width } = props;

  const headingLeft = width / 8;
  const headingRight = width - sv.vars.spacingMD;
  const graphLineLeft = headingLeft - sv.vars.spacingMD;
  const graphLineWidth = width - graphLineLeft * 2;
  const graphLineTop = sv.vars.spacingXL + sv.vars.spacingMD;
  const graphLineHeight = height - graphLineTop - sv.vars.spacingLG;

  const yScale = scale
    .scaleLinear()
    .domain([-1, 1])
    .range([graphLineHeight, 0]);

  const yTicks = [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1];

  // const margin = {
  //   top: sv.vars.spacingXL,
  //   bottom: 5,
  //   right: 17,
  //   left: 17
  // };
  // const inner = {
  //   height: height - margin.top - margin.bottom,
  //   width: width - margin.right - margin.left
  // };

  return (
    <svg
      style={{ position: 'fixed', touchAction: 'none' }}
      height={height}
      width={width}
    >
      <Link to="/">
        <g
          className="c-icon"
          transform={`translate(${sv.vars.spacingSM}, ${sv.vars.spacingSM})`}
        >
          <path d="M14 4 L 8 12 L 14 20" />
        </g>
      </Link>

      <SentimentGroup percent={25} sv={sv} transform={'translate(64, 8)'} />

      <text
        style={sv.h1Mobile}
        x={headingRight}
        y={sv.vars.spacingMD + sv.vars.spacingSM}
        dominantBaseline="middle"
        textAnchor="end"
      >
        #theGrammys
      </text>

      <g id="graph" transform={`translate(${graphLineLeft}, ${graphLineTop})`}>
        <SVGGraphTicksY
          graphLineWidth={graphLineWidth}
          yTicks={yTicks}
          yScale={yScale}
        />
      </g>
    </svg>
  );
}

Mobile.propTypes = propTypes;

export default Mobile;
