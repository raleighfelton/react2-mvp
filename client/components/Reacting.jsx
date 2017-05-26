import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import Scale from './Scale';

const propTypes = {
  avatar: PropTypes.string
};

function Reacting(props) {
  const { avatar } = props;

  return (
    <div className="body">
      <Header avatar={avatar} />
      <div className="l-main">
        <h1 className="c-title">#SuperBowl51</h1>
        <div className="l-content">
          <Scale {...props} />
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
