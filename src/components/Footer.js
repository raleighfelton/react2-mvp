import React from 'react';

function Footer() {
  return (
    <footer className="l-footer">
      <div className="c-stats">
        <span className="c-stat" href="#">
          <img className="c-stat__icon c-stat__icon--users" src="./assets/img/users.svg" />
          <span className="c-stat__value">456k</span>
        </span>
        <span className="c-stat" href="#">
          <img className="c-stat__icon c-stat__icon--friend" src="./assets/img/friend.svg" />
          <span className="c-stat__value">34</span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
