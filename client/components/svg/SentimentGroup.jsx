import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  percent: PropTypes.number,
  sv: PropTypes.object,
  transform: PropTypes.string
};

function SentimentGroup({ percent, sv, transform }) {
  return (
    <g id="sentiment" transform={transform}>
      <circle cx="0" cy="20" r="24" fill="white" />
      <text
        x={32}
        y={24}
        style={sv.h3}
        fill={sv.vars.colorPurple}
        dominantBaseline="ideographic"
        textAnchor="start"
      >
        {percent + 50}%
      </text>

      <text
        style={sv.h1Mobile}
        x={32}
        y={24}
        dominantBaseline="hanging"
        textAnchor="start"
      >
        POSITIVE
      </text>
    </g>
  );
}

SentimentGroup.propTypes = propTypes;

export default SentimentGroup;
