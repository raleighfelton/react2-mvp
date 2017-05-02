import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/img/logo.svg';
import eventImage from '../assets/img/event-fpo.png';

function Landing() {
  return (
    <div>
      <div className="c-logo">
        <img src={logo} alt="React2 logo" />
      </div>

      <div className="l-main l-main--landing">

        <div className="c-content">
          <h1 className="c-headline">
            React2
            <br />
            Your
            <br />
            World
          </h1>

          <p className="c-content__p">This is a proof of concept for a new platform sentiment platform React2. React2 allows you to track your emotional reactions to live events & compare it to your friends & the rest of the world, in real time.</p>
          <a className="c-content__button c-button c-button--round" href="#">Start Reacting Anonymously</a>
        </div>

        <div className="c-event-content">
          <a className="c-event-content__name" href="#">Current Live Event:<span> #theGrammys</span></a>
          <img className="c-event-image" src={eventImage} alt="event image" />
        </div>

      </div>

      <footer className="c-footer">
        <a className="c-footer__link" href="#">Learn More About React2</a>
        <p className="c-footer__cc">©Copyright 2017 React2</p>
      </footer>

      <hr />
      <Link to="/reacting">Welcome to React2</Link>
    </div>
  );
}

export default Landing;
