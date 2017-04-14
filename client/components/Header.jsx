import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';

function Header() {
  return (
    <header className="l-header">
      <Link to="/" className="c-link">Back</Link>
      <ProfileImage />
    </header>
  );
}

export default Header;
