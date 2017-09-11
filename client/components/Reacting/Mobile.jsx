import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as scale from 'd3-scale';

import sv from '../../utils/styleVariables';

import SVGGraphTicksY from '../svg/SVGGraphTicksY';
import SVGDisplayRect from '../svg/SVGDisplayRect';
import SVGReactionRect from '../svg/SVGReactionRect';
import SVGScaleTicksY from '../svg/SVGScaleTicksY';

const propTypes = {
  addReaction: PropTypes.func.isRequired,
  avatar: PropTypes.string,
  height: PropTypes.number,
  id: PropTypes.string,
  myRatings: PropTypes.array,
  reaction: PropTypes.number,
  userRatings: PropTypes.array.isRequired,
  width: PropTypes.number
};

function Mobile(props) {
  const { avatar, addReaction, height, id, reaction, userRatings, width } = props;

  const headingLeft = width / 8;
  const headingRight = width - sv.vars.spacingMD;
  const graphLineLeft = headingLeft - sv.vars.spacingMD;
  const graphLineWidth = width - (graphLineLeft * 2);
  const graphLineTop = sv.vars.buttonHeight + sv.vars.spacingMD;
  const graphLineHeight = height - graphLineTop - sv.vars.spacingLG;

  // const positiveRatings = Math.floor(myRatings.filter((r) => r > 0).length / myRatings.length * 100);
  // const negativeRatings = Math.floor(myRatings.filter((r) => r < 0).length / myRatings.length * 100);

  const yScale = scale
    .scaleLinear()
    .domain([-1, 1])
    .range([graphLineHeight, 0]);

  const yTicks = [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1];

  // const startTime = new Date(2000, 0, 1);
  // const endTime = new Date(2000, 0, 2);
  //
  // const xScale = scale
  //   .scaleTime()
  //   .domain([startTime, endTime])
  //   .range([0, graphLineWidth]);

  return (
    <svg
      style={{ position: 'fixed', touchAction: 'none' }}
      height={height}
      width={width}
    >
      <defs>
        <clipPath id="circleClipPath">
          <circle stroke="#000000" strokeMiterlimit="10" cx="28" cy="28" r="28" />
        </clipPath>
      </defs>

      <Link to="/">
        <g className="c-icon" transform={`translate(${sv.vars.spacingSM}, ${sv.vars.spacingSM})`}>
          <path d="M14 4 L 8 12 L 14 20" />
        </g>
      </Link>

      <text
        style={sv.h1Mobile}
        x={headingRight}
        y={sv.vars.spacingMD + sv.vars.spacingSM}
        dominantBaseline="middle"
        textAnchor="end"
      >
        #theGrammys
      </text>

      <Link to="/compare">
        <text
          style={sv.h1Mobile}
          x={sv.vars.spacingMD}
          y={height - sv.vars.spacingMD}
          dominantBaseline="baseline"
          textAnchor="start"
        >
          Compare
        </text>
      </Link>

      <g id="friends" transform={`translate(${width - sv.vars.spacingXXL}, ${height - (sv.vars.spacingMD * 2.25)})`}>
        <text style={{ ...sv.label, fill: sv.vars.colorBlue }} x={`${sv.vars.spacingMD * 2.5}`} y="21">{userRatings.length}</text>
        <g fill={sv.vars.colorBlue} transform="translate(0, 3)">
          <path d="M12.7058824,15.625 C15.9398427,15.625 19.3062896,17.8928414 21.6874035,21.875 L24,21.875 C21.2209672,16.5385721 16.8984449,13.5416667 12.7058824,13.5416667 C7.11951136,13.5416667 2.77212343,16.5782565 0,21.875 L2.31611558,21.875 C4.79114231,17.7690954 8.32422249,15.625 12.7058824,15.625 Z" />
          <path d="M12,13.5416667 C14.209139,13.5416667 16,11.6761865 16,9.375 C16,7.07381354 14.209139,5.20833333 12,5.20833333 C9.790861,5.20833333 8,7.07381354 8,9.375 C8,11.6761865 9.790861,13.5416667 12,13.5416667 Z M12,15.625 C8.6862915,15.625 6,12.8267797 6,9.375 C6,5.92322031 8.6862915,3.125 12,3.125 C15.3137085,3.125 18,5.92322031 18,9.375 C18,12.8267797 15.3137085,15.625 12,15.625 Z" />
        </g>
      </g>

      <g id="graph" transform={`translate(${graphLineLeft}, ${graphLineTop})`}>
        <SVGGraphTicksY
          graphLineWidth={graphLineWidth}
          yTicks={yTicks}
          yScale={yScale}
        />
        <g id="scale" transform={`translate(${(graphLineWidth / 2) - (88 / 2)}, 0)`}>
          <SVGReactionRect
            addReaction={addReaction}
            graphLineHeight={graphLineHeight}
            graphLineTop={graphLineTop}
            yScale={yScale}
          />
          <SVGDisplayRect
            graphLineHeight={graphLineHeight}
            graphLineTop={graphLineTop}
            yScale={yScale}
          />
          <SVGScaleTicksY
            yTicks={yTicks}
            yScale={yScale}
          />
          <g>
            {userRatings.map((u) => {
              if (u._id === id) { return null; }

              return (
                <image
                  key={u._id}
                  xlinkHref={u.avatar}
                  x={0}
                  y={0}
                  height={sv.vars.spacingXL}
                  width={sv.vars.spacingXL}
                  clipPath="url(#circleClipPath)"
                  transform={`translate(-${sv.vars.spacingXL}, ${yScale(u.reaction || 0) - (sv.vars.spacingXL / 2)})`}
                />
              );
            })}
          </g>
          <image
            xlinkHref={avatar}
            x={0}
            y={0}
            height={sv.vars.spacingXL}
            width={sv.vars.spacingXL}
            clipPath="url(#circleClipPath)"
            transform={`translate(88, ${yScale(reaction || 0) - (sv.vars.spacingXL / 2)})`}
          />
        </g>
        <SVGReactionRect
          addReaction={addReaction}
          graphLineHeight={graphLineHeight}
          graphLineTop={graphLineTop}
          width={graphLineWidth}
          yScale={yScale}
        />
      </g>
    </svg>
  );
}

Mobile.propTypes = propTypes;

export default Mobile;
