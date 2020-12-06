import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return <li key={igKey}><span className="Bold">{igKey}:</span> {props.ingredients[igKey]}</li>
  });

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <h4>Order Total: ${props.orderTotal.toFixed(2)}</h4>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
    </>
  );
};

export default orderSummary;
