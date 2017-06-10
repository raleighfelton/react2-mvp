import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BackArrow from './BackArrow';
import Event from './Event';
import Header from './Header';
import Scale from './Scale';

const propTypes = {
  avatar: PropTypes.string
};

function Reacting(props) {
  const { avatar } = props;

  return (
    <div className="body l-full-screen-flex">
      <div className="c-back-header">
        <Link to="/">
          <BackArrow />
        </Link>
      </div>

      <div className="l-main l-main--graph">

        <Event {...props} />

        <div className="l-content">
          <Scale {...props} />
          <Link
            className="c-button c-button--tall c-button--blue"
            to="/Compare"
          >
            Compare
          </Link>
        </div>
      </div>
    </div>
  );
}

Reacting.propTypes = propTypes;

export default Reacting;
