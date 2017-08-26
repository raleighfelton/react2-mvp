import React from 'react';
import PropTypes from 'prop-types';
import * as scale from 'd3-scale';
import { extent } from 'd3-array';
import { line } from 'd3-shape';

import sv from '../../utils/styleVariables';

import SVGButton from '../svg/SVGButton';
import SVGGraphTicksY from '../svg/SVGGraphTicksY';

const propTypes = {
  height: PropTypes.number,
  isMobile: PropTypes.bool,
  reactions: PropTypes.array,
  width: PropTypes.number
};

function Desktop(props) {
  const { height, isMobile, reactions, width } = props;

  const h1Baseline =
    height / 5 < sv.vars.h1Baseline ? Math.abs(height / 5) : sv.vars.h1Baseline;
  const headingLeft = width / 8;
  const shareGroupRight = width - (headingLeft + sv.vars.buttonWidth);
  const graphLineLeft = headingLeft - sv.vars.spacingMD;
  const graphLineWidth = width - graphLineLeft * 2;
  const graphLineTop = h1Baseline + sv.vars.spacingXL * 2.5;
  const graphLineHeight = height - graphLineTop - sv.vars.spacingXXL;

  const yScale = scale
    .scaleLinear()
    .domain([-1, 1])
    .range([graphLineHeight, 0]);

  const yTicks = [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1];

  const xDomain = reactions && reactions.length ? extent(reactions, (r) => new Date(r.createdAt)) : [Date.now(), Date.now()];

  console.log(xDomain);
  console.log(graphLineWidth);

  const xScale = scale
    .scaleTime()
    .domain(xDomain)
    .range([0, graphLineWidth]);

  const positiveRatings = 56;
  const negativeRatings = 44;
  const avatar = '';

  // const trendLine = line()
  //   .x(function(d) { return xScale(d.createdAt); })
  //   .y(function(d) { return yScale(d.value); });
  //
  // console.log(trendLine(reactions));

  return (
    <svg
      style={{ position: 'fixed', touchAction: 'none' }}
      height={height}
      width={width}
    >
      <defs>
        <clipPath id="circleClipPath">
          <circle
            stroke="#000000"
            strokeMiterlimit="10"
            cx="28"
            cy="28"
            r="28"
          />
        </clipPath>
      </defs>

      <SVGButton
        label="Back"
        to="/"
        transform={`translate(${sv.vars.spacingMD}, ${sv.vars.spacingMD})`}
        isSmall
        noFill
      />

      <text
        style={sv.h1}
        x={headingLeft}
        y={h1Baseline}
        dominantBaseline="baseline"
        textAnchor="start"
      >
        #theGrammys
      </text>

      {!isMobile &&
        <g
          transform={`translate(${headingLeft}, ${h1Baseline +
            sv.vars.spacingSM * 2})`}
        >
          <image
            xlinkHref={avatar}
            x="0"
            y="0"
            height={sv.vars.spacingXL}
            width={sv.vars.spacingXL}
            clipPath="url(#circleClipPath)"
          />
          <g
            transform={`translate(${sv.vars.spacingXL + sv.vars.spacingMD}, 0)`}
          >
            <text
              style={sv.h2}
              x={0}
              y={sv.vars.h2Baseline}
              dominantBaseline="baseline"
              textAnchor="start"
            >
              {positiveRatings || '--'}%
            </text>
            <text
              style={sv.h3}
              x={0}
              y={sv.vars.h2Baseline + 8}
              dominantBaseline="hanging"
              textAnchor="start"
            >
              Positive
            </text>
          </g>
          <g
            transform={`translate(${sv.vars.spacingXL +
              sv.vars.spacingMD +
              100}, 0)`}
          >
            <text
              style={sv.h2}
              x={0}
              y={sv.vars.h2Baseline}
              dominantBaseline="baseline"
              textAnchor="start"
            >
              {negativeRatings || '--'}%
            </text>
            <text
              style={sv.h3}
              x={0}
              y={sv.vars.h2Baseline + 8}
              dominantBaseline="hanging"
              textAnchor="start"
            >
              Negative
            </text>
          </g>
        </g>}
      {!isMobile &&
        <g
          transform={`translate(${shareGroupRight}, ${h1Baseline +
            sv.vars.spacingMD})`}
        >
          <g>
            <rect
              height={44}
              style={sv.darkButton.box}
              width={sv.vars.buttonWidth}
              x={0}
              y={0}
            />
            <text
              x={0}
              y={0}
              dominantBaseline="middle"
              style={sv.darkButton.text}
              textAnchor="middle"
              transform={`translate(${sv.vars.buttonWidth / 2}, ${44 / 2})`}
            >
              Share
            </text>
          </g>
          <g id="users" transform={`translate(16, ${44 + 8})`}>
            <text style={sv.label} x={`${sv.vars.spacingMD * 2.5}`} y="21">
              {400}k
            </text>
            <g fill={sv.vars.colorWhite}>
              <path d="M18.6666667,17.3333333 C19.870109,15.7167753 21.8160748,14.6666667 24.0118822,14.6666667 C26.1932942,14.6666667 28.1281297,15.7030517 29.3333333,17.3016127 L27.5503365,17.306915 C26.5954459,16.453917 25.345233,15.9634856 24.0118822,15.9634856 C22.6673498,15.9634856 21.407496,16.4622502 20.4499033,17.3280303 L18.6666667,17.3333333 Z" />
              <path d="M24,13.6666667 C24.9204746,13.6666667 25.6666667,12.9204746 25.6666667,12 C25.6666667,11.0795254 24.9204746,10.3333333 24,10.3333333 C23.0795254,10.3333333 22.3333333,11.0795254 22.3333333,12 C22.3333333,12.9204746 23.0795254,13.6666667 24,13.6666667 Z M24,14.6666667 C22.5272407,14.6666667 21.3333333,13.4727593 21.3333333,12 C21.3333333,10.5272407 22.5272407,9.33333333 24,9.33333333 C25.4727593,9.33333333 26.6666667,10.5272407 26.6666667,12 C26.6666667,13.4727593 25.4727593,14.6666667 24,14.6666667 Z" />
              <path d="M6.66666667,21.3333333 C8.77269068,18.1002172 12.1781309,16 16.0207938,16 C19.8382648,16 23.224227,18.07277 25.3333333,21.2698921 L23.4621791,21.2762515 C21.5680452,18.9751127 18.8958123,17.6237361 16.0207938,17.6237361 C13.1241244,17.6237361 10.4337179,18.9957035 8.53785894,21.3269738 L6.66666667,21.3333333 Z" />
              <path d="M16,16 C17.4727593,16 18.6666667,14.8060927 18.6666667,13.3333333 C18.6666667,11.860574 17.4727593,10.6666667 16,10.6666667 C14.5272407,10.6666667 13.3333333,11.860574 13.3333333,13.3333333 C13.3333333,14.8060927 14.5272407,16 16,16 Z M16,17.3333333 C13.790861,17.3333333 12,15.5424723 12,13.3333333 C12,11.1241943 13.790861,9.33333333 16,9.33333333 C18.209139,9.33333333 20,11.1241943 20,13.3333333 C20,15.5424723 18.209139,17.3333333 16,17.3333333 Z" />
              <path
                d="M8.01188219,15.9634856 C9.34523298,15.9634856 10.5954459,16.453917 11.5503365,17.306915 L13.3333333,17.3016127 C12.1281297,15.7030517 10.1932942,14.6666667 8.01188219,14.6666667 C5.8160748,14.6666667 3.87010896,15.7167753 2.66666667,17.3333333 L4.44990334,17.3280303 C5.40749596,16.4622502 6.66734981,15.9634856 8.01188219,15.9634856 Z"
                id="Oval-21-Copy-2"
              />
              <path d="M8,13.6666667 C8.92047458,13.6666667 9.66666667,12.9204746 9.66666667,12 C9.66666667,11.0795254 8.92047458,10.3333333 8,10.3333333 C7.07952542,10.3333333 6.33333333,11.0795254 6.33333333,12 C6.33333333,12.9204746 7.07952542,13.6666667 8,13.6666667 Z M8,14.6666667 C6.52724067,14.6666667 5.33333333,13.4727593 5.33333333,12 C5.33333333,10.5272407 6.52724067,9.33333333 8,9.33333333 C9.47275933,9.33333333 10.6666667,10.5272407 10.6666667,12 C10.6666667,13.4727593 9.47275933,14.6666667 8,14.6666667 Z" />
            </g>
          </g>
          <g
            id="friends"
            transform={`translate(${sv.vars.buttonWidth / 2 + 16}, ${44 + 8})`}
          >
            <text
              style={{ ...sv.label, fill: sv.vars.colorBlue }}
              x={`${sv.vars.spacingMD * 2.5}`}
              y="21"
            >
              {500}
            </text>

            <g fill={sv.vars.colorBlue} transform="translate(0, 3)">
              <path d="M12.7058824,15.625 C15.9398427,15.625 19.3062896,17.8928414 21.6874035,21.875 L24,21.875 C21.2209672,16.5385721 16.8984449,13.5416667 12.7058824,13.5416667 C7.11951136,13.5416667 2.77212343,16.5782565 0,21.875 L2.31611558,21.875 C4.79114231,17.7690954 8.32422249,15.625 12.7058824,15.625 Z" />
              <path d="M12,13.5416667 C14.209139,13.5416667 16,11.6761865 16,9.375 C16,7.07381354 14.209139,5.20833333 12,5.20833333 C9.790861,5.20833333 8,7.07381354 8,9.375 C8,11.6761865 9.790861,13.5416667 12,13.5416667 Z M12,15.625 C8.6862915,15.625 6,12.8267797 6,9.375 C6,5.92322031 8.6862915,3.125 12,3.125 C15.3137085,3.125 18,5.92322031 18,9.375 C18,12.8267797 15.3137085,15.625 12,15.625 Z" />
            </g>
          </g>
        </g>}

      <g id="graph" transform={`translate(${graphLineLeft}, ${graphLineTop})`}>
        <SVGGraphTicksY
          graphLineHeight={graphLineHeight}
          graphLineWidth={graphLineWidth}
          yTicks={yTicks}
          yScale={yScale}
        />
        {reactions && reactions.map((r, i) => {
          console.log(xScale(new Date(r.createdAt)));
          return (
            <circle key={i} cx={xScale(new Date(r.createdAt))} cy={yScale(r.value)} r="4" fill="#eee" />
          );
        })}
        {reactions && <path fill="none" stroke="#ffff00" strokeWidth="2" d={reactions.map((r, i) => {
          if (i === 0) {
            return `M${xScale(new Date(r.createdAt)) || 0} ${yScale(r.value)}`;
          }
          return `L ${xScale(new Date(r.createdAt))} ${yScale(r.value)}`;
        })} />}
      </g>
    </svg>
  );
}

Desktop.propTypes = propTypes;

export default Desktop;
