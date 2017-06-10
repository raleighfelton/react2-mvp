import React from 'react';
import sv from '../../utils/styleVariables';
import { tickLabelCheck } from '../../utils/graphHelpers';

function SVGGraphTicksY({ graphLineWidth, yTicks, yScale }) {
  return (
    <g id="graph-lines">
      {yTicks.map((tick) => {
        const y = yScale(tick);
        const tickLabel = tickLabelCheck(tick);
        const tickStyle = (tick === 0) ? sv.ticksPrimary : sv.ticks;

        return (
          <g key={tick}>
            <line x1="0" y1={y} x2={graphLineWidth - sv.vars.spacingXXL} y2={y} style={tickStyle} />
            {tickLabel &&
              <text
                x={graphLineWidth - sv.vars.spacingSM}
                y={y}
                style={{ fill: sv.vars.colorWhite, fontSize: sv.vars.fontSizeSM }}
                dominantBaseline="middle"
                textAnchor="end"
              >
                {tickLabel}
              </text>}
          </g>
        );
      })}
    </g>
  );
}

export default SVGGraphTicksY;
