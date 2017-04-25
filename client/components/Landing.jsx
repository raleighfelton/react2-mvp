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
      <div className="l-main">
        <h1>
          React2
          <br />
          Your
          <br />
          World
        </h1>
        <a href="#">Current Live Event:<span> #theGrammys</span></a>
        <div className="c-event-image">
          <img src={eventImage} height="320" width="320" alt="event image" />
        </div>
        <div className="l-content">
          <a className="c-button c-button--round c-splash__button" href="#">Start Reacting Anonymously</a>
          <p className="c-splash__p">This is a proof of concept for a new platform sentiment platform React2. React2 allows you to track your emotional reactions to live events & compare it to your friends & the rest of the world, in real time.</p>
        </div>
        <div className="c-splash__footer" href="#"><a><span>Learn More About React2</span></a></div>
      </div>
      <hr />
      <Link to="/reacting">Welcome to React2</Link>
    </div>
  );
}

export default Landing;
