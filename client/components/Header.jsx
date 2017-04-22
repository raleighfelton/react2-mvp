import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ProfileImage from './ProfileImage';

const propTypes = {
  avatar: PropTypes.string.isRequired
};

function Header({ avatar }) {
  return (
    <header className="l-header">
      <Link to="/" className="c-link">Back</Link>
      <ProfileImage avatar={avatar} />
    </header>
  );
}

Header.propTypes = propTypes;

export default Header;
