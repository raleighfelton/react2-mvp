import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  addReaction: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  myRating: PropTypes.number,
  ratings: PropTypes.array.isRequired
};

const increments = [
  { rating: 100, label: '+' },
  { rating: 90 },
  { rating: 80 },
  { rating: 70 },
  { rating: 60 },
  { rating: 50, label: 'N' },
  { rating: 40 },
  { rating: 30 },
  { rating: 20 },
  { rating: 10 },
  { rating: 1, label: '-' }
];

function Scale({ addReaction, avatar, myRating, ratings }) {
  console.log(ratings); // eslint-disable-line no-console

  return (
    <div className="c-scale">
      {increments.map((increment, iteration) => {
        return (
          <div
            key={iteration}
            className="c-scale__tick-container"
            onClick={addReaction(increment.rating)}
          >
            {increment.label ?
              <div className="c-scale__tick c-scale__tick--labeled">
                <div className="c-scale__label">{increment.label}</div>
              </div> :
              <div className="c-scale__tick" />}
            {myRating && (myRating === increment.rating) &&
              <div className="c-rating c-rating--primary">
                <img className="c-rating__avatar" src={avatar} alt="rating avatar" />
              </div>}
          </div>
        );
      })}
    </div>
  );
}

Scale.propTypes = propTypes;

export default Scale;
