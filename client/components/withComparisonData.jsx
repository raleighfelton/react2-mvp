import React from 'react';
import axios from 'axios';

// This function takes a component...
export default function withComparisonData(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        reactions: null
      };
    }

    componentDidMount() {
      axios.get('/api/reactions')
        .then((response) => {
          this.setState({
            reactions: response.data.reactions
          });
        });
    }

    render() {
      const props = {
        ...this.props,
        ...this.state
      };

      return (
        <WrappedComponent
          {...props}
        />
      );
    }
  };
}
