import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Images
import graphCompare from '../assets/img/graph_compare.svg';
// Components
import BackArrow from './BackArrow';

const propTypes = {
  avatar: PropTypes.string,
  hashtag: PropTypes.string,
  negativePercentage: PropTypes.number,
  positivePercentage: PropTypes.number,
  totalUsers: PropTypes.number
};

function Comparing(props) {
  return (
    <div className="body">
      <div className="c-back-header">
        <Link to="/reacting">
          <BackArrow />
        </Link>
      </div>
      <div className="l-main">
        <div>
          <img src={graphCompare} />
        </div>
      </div>
    </div>
  );
}

Comparing.propTypes = propTypes;

export default Comparing;
