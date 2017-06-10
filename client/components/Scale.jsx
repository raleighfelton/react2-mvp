import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withContentRect } from 'react-measure';
import * as scale from 'd3-scale';

const propTypes = {
  addReaction: PropTypes.func.isRequired,
  avatar: PropTypes.string,
  id: PropTypes.string,
  userRatings: PropTypes.array.isRequired
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

let i = 0;

class Scale extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    console.log(`i: ${i}`);
    i++;
  }

  render() {
    const { addReaction, contentRect, id, measure, measureRef, userRatings } = this.props;
    const { height, width } = contentRect.bounds;
    console.log(`h: ${height}`);
    console.log(`w: ${width}`);

    const yScale = scale
      .scaleLinear()
      .domain([1, 100])
      .range([height, 0]);

    const xScale = scale
      .scaleLinear()
      .domain([0, 100])
      .range([0, width]);

    // console.log(userRatings); // eslint-disable-line no-console
    // console.log(contentRect);
    return (
      <div
        className="c-scale"
        ref={measureRef}
      >
        {height && width && increments.map((increment, iteration) => {
          const userList = this.props.userRatings.filter((user) => user.reaction === increment.rating);

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
              {userList.map((user) => {
                const ratingClasses = classNames(
                  { 'c-rating': true },
                  { 'c-rating--primary': (id === user._id) },
                  { 'c-rating--secondary': (id !== user._id) }
                );

                return (
                  <div key={user._id} className={ratingClasses}>
                    <img className="c-rating__avatar" src={user.avatar} alt="rating avatar" />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

Scale.propTypes = propTypes;

export default withContentRect('bounds')(Scale);
