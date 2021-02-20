import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import React, { Component } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  updatePurchasable(ingredients) {
    let sum = Object.keys(ingredients).map(IGkey => {
      return ingredients[IGkey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);

    return sum > 0;
  };

  render() {
    let orderSummary = null;

    if(this.props.ings) {
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        orderTotal={this.props.price} />
    }

    let burger = this.props.error ? <h2>Ingredients Can't be loaded</h2> : <Spinner />;

    if(this.props.ings) {
      burger = (
        <>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientsAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            price={this.props.price}
            purchasable={this.updatePurchasable(this.props.ings)}
            purchaseHandler={this.purchaseHandler} />
        </>
      );
    }

    return (
      <>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <section className="BurgerContainer">
          {burger}
        </section>
      </>
    );
  }
}
const mapsStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
