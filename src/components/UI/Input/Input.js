import React from 'react';

const input = (props) => {
  let inputElement = null;

  switch(props.elementtype) {
    case('input'):
      inputElement = <input
        className="InputElement"
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />
      break;
    case('textarea'):
    inputElement = <textarea
      className="InputElement"
      {...props.elementConfig}
      value={props.value}
      onChange={props.changed} />
      break;
    default:
      inputElement = <input
        className="InputElement"
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />
  }

  return(
    <div className="Input">
      {inputElement}
    </div>
  )
}

export default input;
