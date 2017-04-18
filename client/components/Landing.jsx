import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/img/logo.svg';

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
      </div>
      <hr />
      <Link to="/reacting">Welcome to React2</Link>
    </div>
  );
}

export default Landing;
