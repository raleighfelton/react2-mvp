import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import Scale from './Scale';

const propTypes = {
  addReaction: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  myRating: PropTypes.number,
  ratings: PropTypes.array.isRequired
};

function Reacting({ addReaction, avatar, myRating, ratings }) {
  return (
    <div className="body">
      <Header avatar={avatar} />
      <div className="l-main">
        <h1 className="c-title">#SuperBowl51</h1>
        <div className="l-content">
          <Scale addReaction={addReaction} avatar={avatar} myRating={myRating} ratings={ratings} />
          <Link
            className="c-button c-button--tall c-button--hide-mobile c-button--blue"
            to="/Compare"
          >
            Compare
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

Reacting.propTypes = propTypes;

export default Reacting;
