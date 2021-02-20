import React from 'react';

const buildControl = (props) => {
  return (
    <div className="BuildControl">
      <div className="Label">{props.label}</div>
      <button className="Less" disabled={!props.isPurchasable} onClick={props.removed}>-</button>
      <button className="More" onClick={props.added}>+</button>
    </div>
  );
}

export default buildControl;
