import React from 'react'

const order = (props) => {
  const ingredients = [];
  for(let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    })
  }

  const ingredientOutput = ingredients.map(ig => {
    return <span className="OrderDetails" key={ig.name}>{ig.name} ({ig.amount})</span>
  });
  return(
    <div className="Order">
      <p>Ingredinets {ingredientOutput}</p>
      <p>Price: <strong>${ props.price.toFixed(2) }</strong></p>
    </div>
  );
};

export default order;
