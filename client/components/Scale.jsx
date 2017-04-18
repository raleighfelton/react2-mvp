import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  addReaction: PropTypes.func.isRequired,
  ratings: PropTypes.array.isRequired
};

function Scale({ addReaction, ratings }) {
  console.log(ratings); // eslint-disable-line no-console

  return (
    <div className="c-scale">
      <div className="c-scale__tick-container" onClick={addReaction(100)}>
        <div className="c-scale__tick c-scale__tick--labeled">
          <div className="c-scale__label">+</div>
        </div>
      </div>
      <div className="c-scale__tick-container" onClick={addReaction(90)}>
        <div className="c-scale__tick" />
      </div>
      <div className="c-scale__tick-container" onClick={addReaction(80)}>
        <div className="c-scale__tick" />
      </div>
      <div className="c-scale__tick-container" onClick={addReaction(70)}>
        <div className="c-scale__tick" />
      </div>
      <div className="c-scale__tick-container" onClick={addReaction(60)}>
        <div className="c-scale__tick" />
      </div>
      <div className="c-scale__tick-container" onClick={addReaction(50)}>
        <div className="c-scale__tick c-scale__tick--labeled">
          <div className="c-scale__label">N</div>
        </div>
      </div>
      <div className="c-scale__tick-container" onClick={addReaction(40)}>
        <div className="c-scale__tick" />
      </div>
      <div className="c-scale__tick-container" onClick={addReaction(30)}>
        <div className="c-scale__tick" />
      </div>
      <div className="c-scale__tick-container" onClick={addReaction(20)}>
        <div className="c-scale__tick" />
      </div>
      <div className="c-scale__tick-container" onClick={addReaction(10)}>
        <div className="c-scale__tick" />
      </div>
      <div className="c-scale__tick-container" onClick={addReaction(0)}>
        <div className="c-scale__tick c-scale__tick--labeled">
          <div className="c-scale__label">-</div>
        </div>
      </div>
    </div>
  );
}

Scale.propTypes = propTypes;

export default Scale;
