import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as scale from 'd3-scale';
import { extent } from 'd3-array';
import { line, curveStepAfter } from 'd3-shape';

import sv from '../../utils/styleVariables';

import SVGGraphTicksY from '../svg/SVGGraphTicksY';
import SentimentGroup from '../svg/SentimentGroup';

const propTypes = {
  height: PropTypes.number,
  reactions: PropTypes.array,
  width: PropTypes.number
};

function Mobile(props) {
  const { height, reactions, width } = props;

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

  const xDomain = reactions && reactions.length ? extent(reactions, (r) => new Date(r.createdAt)) : [Date.now(), Date.now()];

  const xScale = scale
    .scaleTime()
    .domain(xDomain)
    .range([0, graphLineWidth]);

  const trendPath = line()
    .x(d => xScale(new Date(d.createdAt)))
    .y(d => yScale(d.value))
    .defined(() => true)
    .curve(curveStepAfter);

  return (
    <svg
      style={{ position: 'fixed', touchAction: 'none' }}
      height={height}
      width={width}
    >
      <Link to="/reacting">
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
        {reactions &&
          <path
            d={trendPath(reactions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))}
            stroke={sv.vars.colorPurple}
            strokeWidth="2"
            fill="none"
          />}
      </g>
    </svg>
  );
}

Mobile.propTypes = propTypes;

export default Mobile;
