import React from 'react';

function Scale() {
  return (
    <div className="c-scale">
      <div className="c-scale__tick c-scale__tick--labeled">
        <div className="c-scale__label">+</div>
      </div>
      <div className="c-scale__tick" />
      <div className="c-scale__tick" />
      <div className="c-scale__tick" />
      <div className="c-scale__tick" />
      <div className="c-scale__tick c-scale__tick--labeled">
        <div className="c-scale__label">N</div>
      </div>
      <div className="c-scale__tick" />
      <div className="c-scale__tick" />
      <div className="c-scale__tick" />
      <div className="c-scale__tick" />
      <div className="c-scale__tick c-scale__tick--labeled">
        <div className="c-scale__label">-</div>
      </div>
    </div>
  );
}

export default Scale;
