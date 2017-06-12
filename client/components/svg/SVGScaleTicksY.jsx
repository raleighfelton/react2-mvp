import React from 'react';
import PropTypes from 'prop-types';
import sv from '../../utils/styleVariables';
import { tickLabelCheck } from '../../utils/graphHelpers';

const propTypes = {
  yScale: PropTypes.func,
  yTicks: PropTypes.array
};

function SVGScaleTicksY({ yTicks, yScale }) {
  const fullWidth = 88;
  const margin = 8; // sv.vars.spacingXS;
  const scaleTicksWidth = fullWidth - (margin * 2);
  const scaleTicksX1 = 16; // sv.vars.spacingSM;
  const scaleTicksX2 = scaleTicksWidth - scaleTicksX1;
  const labelWidth = Math.floor(scaleTicksWidth / 2) - sv.vars.spacingMD;
  const labelX = scaleTicksWidth / 2;
  const labelTicksLeftX1 = 0;
  const labelTicksLeftX2 = labelWidth;
  const labelTicksRightX2 = scaleTicksWidth;
  const labelTicksRightX1 = labelTicksRightX2 - labelWidth;
  const effedUpOffset = 2;
  const translation = margin + effedUpOffset;

  return (
    <g id="scale-ticks" transform={`translate(${translation}, 0)`}>
      {yTicks.map((tick) => {
        const y = yScale(tick);
        const tickLabel = tickLabelCheck(tick);

        if (tickLabel) {
          return (
            <g key={tick}>
              <line x1={labelTicksLeftX1} y1={y} x2={labelTicksLeftX2} y2={y} style={sv.ticksPrimary} />
              <text
                x={labelX}
                y={y}
                style={{ fill: sv.vars.colorWhite, fontSize: sv.vars.fontSizeSM }}
                dominantBaseline="middle"
                textAnchor="middle"
                transform={`translate(-${effedUpOffset}, 0)`}
              >
                {tickLabel}
              </text>
              <line x1={labelTicksRightX1} y1={y} x2={labelTicksRightX2} y2={y} style={sv.ticksPrimary} />
            </g>
          );
        }

        return (
          <g key={tick}>
            <line x1={scaleTicksX1} y1={y} x2={scaleTicksX2} y2={y} style={sv.ticks} />
          </g>
        );
      })}
    </g>
  );
}

SVGScaleTicksY.propTypes = propTypes;

export default SVGScaleTicksY;
