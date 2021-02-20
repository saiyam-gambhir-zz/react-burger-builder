import React from 'react';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => {
  return (
    <div className="BuildControls">
      <p>Current Price: <span className="bold">${props.price.toFixed(2)}</span></p>
      <div>
        {controls.map(control =>
          <BuildControl
            key={control.label}
            label={control.label}
            added={() => props.ingredientsAdded(control.type)}
            removed={() => props.ingredientRemoved(control.type)}
            isPurchasable={props.purchasable} />
        )}
      </div>
      <button disabled={!props.purchasable} onClick={props.purchaseHandler} className="OrderButton">Order Now</button>
    </div>
  );
}

export default buildControls;
