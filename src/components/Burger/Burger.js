import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  // Transform Object keys into array
  let transformedIngredients = Object.keys(props.ingredients).map(ingredientkey => {
    return [...Array(props.ingredients[ingredientkey])].map((_, index) => {
      return  <BurgerIngredient key={ingredientkey + index} type={ingredientkey} />
    })
  }).reduce((arr, el) => {
    return arr.concat(el)
  }, []);

  if(transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Start adding <span className="bold">INGREDIENTS</span></p>
  }
  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
