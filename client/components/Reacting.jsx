import React from 'react';
import { Link } from 'react-router-dom';
// import client from 'socket.io-client';

import Header from './Header';
import Footer from './Footer';
import Scale from './Scale';

// const socket = client('http://localhost:3000');
// // console.log(socket);
// // const connection = socket.io;
// const rx = {
//   userID: 'fsadfhuhsif',
//   reaction: 10
// };
// socket.emit('reaction', rx);
// socket.on('reaction', function(msg){
//   console.log(msg);
// });

function Reacting() {
  return (
    <div className="body">
      <Header />
      <div className="l-main">
        <h1 className="c-title">#SuperBowl51</h1>
        <div className="l-content">
          <Scale />
          <Link
            className="c-button c-button--tall c-button--hide-mobile"
            to="/Compare"
          >
            Compare
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Reacting;
