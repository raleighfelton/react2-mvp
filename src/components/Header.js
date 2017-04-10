import React from 'react';
import ProfileImage from './ProfileImage';

function Header() {
  return (
    <header className="l-header">
      <a className="c-link" href="#">Back</a>
      <ProfileImage />
    </header>
  );
}

export default Header;
