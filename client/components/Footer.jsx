import React from 'react';

import usersImg from '../assets/img/users.svg';
import friendImg from '../assets/img/friend.svg';

function Footer() {
  return (
    <footer className="l-footer">
      <div className="c-stats">
        <span className="c-stat" href="#">
          <img className="c-stat__icon c-stat__icon--users" src={usersImg} />
          <span className="c-stat__value">456k</span>
        </span>
        <span className="c-stat" href="#">
          <img className="c-stat__icon c-stat__icon--friend" src={friendImg} />
          <span className="c-stat__value">34</span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
