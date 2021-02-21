/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ConatctData extends Component {

  createOrderForm = (elementType, type, placeholder) => {
    return {
      elementType,
      elementConfig: {
        type,
        placeholder,
      },
      value: ''
    }
  }

  state = {
    orderForm: {
      name: this.createOrderForm('input', 'text', 'Name'),
      email: this.createOrderForm('input', 'email', 'Email'),
      street: this.createOrderForm('input', 'text', 'Street'),
      zipcode: this.createOrderForm('input', 'text', 'ZipCode'),
      country: this.createOrderForm('input', 'text', 'Country'),
    },
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for(let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderForm: formData,
      deliveryMethod: 'fastest'
    }
    this.props.onOrderBurger(order);
  };

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    }
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(event) => this.inputChangeHandler(event, formElement.id)} />
          ))}
          <Button btnType="Success">Order</Button>
        </form>
    );
    if(this.props.loading) {
      form = <Spinner />
    }
    return(
      <div className="ContactData">
        <h4>Enter the contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burderBuilder.ingredients,
    price: state.burderBuilder.totalPrice,
    loading: state.order.loading
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    onResetBurger: () => dispatch(actionTypes.resetBurger()),
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
  }
};

export default connect(mapStateToProps, mapsDispatchToProps)(withErrorHandler(ConatctData, axios));
