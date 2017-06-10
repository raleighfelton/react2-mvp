// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// Images
import usersImg from '../assets/img/users.svg';

const propTypes = {
  avatar: PropTypes.string,
  hashtag: PropTypes.string,
  negativePercentage: PropTypes.number,
  positivePercentage: PropTypes.number,
  totalUsers: PropTypes.number
};

function Event({ avatar, hashtag, negativePercentage, positivePercentage, totalUsers }) {
  return (
    <div className="c-event c-event--hide-mobile">
      <h2 className="c-event__title">{hashtag}</h2>
      <div className="c-event__status">
        <div className="c-profile-stats">
          <img className="c-profile-stats__avatar" src={avatar} />
          <div className="c-profile-stats__percent">
            <h3>{positivePercentage}%</h3>
            <h6>Positive</h6>
          </div>
          <div className="c-profile-stats__percent">
            <h3>{negativePercentage}%</h3>
            <h6>Negative</h6>
          </div>
        </div>
        <div className="c-event__action">
          <button className="c-button c-button--filled">Share</button>
          <span className="c-stat" href="#">
            <img className="c-stat__icon c-stat__icon--users" src={usersImg} />
            <span className="c-stat__value">{totalUsers}k</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Event;
