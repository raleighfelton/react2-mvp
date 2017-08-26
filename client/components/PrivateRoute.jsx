import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

const propTypes = {
  component: PropTypes.func,
  location: PropTypes.object
};

class PrivateRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      rehydrated: false,
      user: null
    };
  }

  componentDidMount() {
    axios.get('/api/profile')
      .then(({ data }) => {
        this.setState({
          isAuthenticated: true,
          rehydrated: true,
          user: data.user
        });
      })
      .catch(() => {
        this.setState({
          isAuthenticated: false,
          rehydrated: true,
          user: null
        });
      });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    console.log(this.state);

    return (
      <Route
        {...rest}
        render={(props) => {
          if (!this.state.rehydrated) {
            return <div>Is Loading!!!</div>;
          }

          const p = {
            ...this.state,
            ...this.state.user,
            ...props
          };

          return this.state.isAuthenticated ?
            <Component { ...p } /> :
            <Redirect
              to={{ pathname: '/', state: { from: props.location } }}
            />;
        }}
      />
    );
  }
}

PrivateRoute.propTypes = propTypes;

export default PrivateRoute;
