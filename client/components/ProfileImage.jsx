import React from 'react';
import PropTypes from 'prop-types';

import profileImg from '../assets/img/profile.png';

const propTypes = {
  avatar: PropTypes.string.isRequired
};

const defaultProps = {
  avatar: profileImg
};

function ProfileImage({ avatar }) {
  return (
    <a className="c-profile" href="#">
      <img className="c-profile__icon" src={avatar} alt="Profile Icon" />
    </a>
  );
}

ProfileImage.propTypes = propTypes;
ProfileImage.defaultProps = defaultProps;

export default ProfileImage;
