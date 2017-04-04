import React from 'react';

import Header from './Header';
import Footer from './Footer';
import Scale from './Scale';

function App() {
  return (
    <div>
      <Header />
      <div className="l-main">
        <h1 className="c-title">#SuperBowl51</h1>
        <div className="l-content">
          <Scale />
          <button className="c-button c-button--tall c-button--hide-mobile">Compare</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
