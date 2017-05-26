import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import graphCompare from '../assets/img/graph_compare.svg';

const propTypes = {
  avatar: PropTypes.string.isRequired
};

function Comparing({ avatar }) {
  return (
    <div className="body">
      <div className="c-back-header">
        <Link to="/reacting" className="">Back</Link>
      </div>

      <div className="l-main l-main--compare">

        <div>
          <h2 className="c-event__title">#theGrammys</h2>

          <div className="c-event__status">
            <div className="c-profile-stats">
              <img className="c-profile-stats__avatar" src={avatar} />
              <div className="c-profile-stats__percent">
                <h3>53%</h3>
                <h6>Positive</h6>
              </div>
              <div className="c-profile-stats__percent">
                <h3>47%</h3>
                <h6>Negative</h6>
              </div>
            </div>

            <div className="c-event__action">
              <button className="c-button c-button--filled c-button__share">Share</button>

              <span className="c-stat" href="#">
                <img className="c-stat__icon c-stat__icon--users" src="../assets/img/users.svg" />
                <span className="c-stat__value">456k</span>
              </span>
            </div>

          </div>
        </div>

        <div>
          <img src={graphCompare} />
        </div>

      </div>

    </div>
  );
}

Comparing.propTypes = propTypes;

export default Comparing;
