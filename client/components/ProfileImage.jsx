import React from 'react';

import profileImg from '../assets/img/profile.png';

function ProfileImage() {
  return (
    <a className="c-profile" href="#">
      <img className="c-profile__icon" src={profileImg} alt="Profile Icon" />
    </a>
  );
}

export default ProfileImage;
