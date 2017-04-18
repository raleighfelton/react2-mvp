import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import Scale from './Scale';

const propTypes = {
  addReaction: PropTypes.func.isRequired,
  ratings: PropTypes.array.isRequired
};

function Reacting({ addReaction, ratings }) {
  return (
    <div className="body">
      <Header />
      <div className="l-main">
        <h1 className="c-title">#SuperBowl51</h1>
        <div className="l-content">
          <Scale addReaction={addReaction} ratings={ratings} />
          <Link
            className="c-button c-button--tall c-button--hide-mobile"
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

export default Reacting;
