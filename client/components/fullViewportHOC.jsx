import React from 'react';

function searchParentNodesForClassName(node, className, tagName = 'BODY') {
  if (node.tagName === (tagName || 'BODY')) {
    return false;
  }

  if (node.classList.contains(className)) {
    return true;
  }

  return searchParentNodesForClassName(node.parentNode, className, tagName);
}

// This function takes a component...
export default function fullViewportHOC(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { width: 320, height: 480, isMobile: true }; // mobile first, amirite?
      this.preventDefault = this.preventDefault.bind(this);
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
      document.addEventListener("touchmove", this.preventDefault, true);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
      document.removeEventListener("touchmove", this.preventDefault, true);
    }

    preventDefault(e) {
      if (searchParentNodesForClassName(e.target, 'js-touch', 'svg')) {
        e.stopPropagation();
      } else {
        e.preventDefault();
      }
    }

    updateWindowDimensions() {
      console.log(window.innerWidth);
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: !!(window.innerWidth < 960)
      });
    }

    render() {
      return (
        <WrappedComponent
          height={this.state.height}
          width={this.state.width}
          isMobile={this.state.isMobile}
          {...this.props}
        />
      );
    }
  };
}
