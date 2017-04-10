import React from 'react';

function Header() {
  return (
    <header className="l-header">
      <a className="c-link" href="#">Back</a>
      <a className="c-profile" href="#">
        <img className="c-profile__icon" src="../assets/img/profile.png" alt="Profile Icon" />
      </a>
    </header>
  );
}

export default Header;
