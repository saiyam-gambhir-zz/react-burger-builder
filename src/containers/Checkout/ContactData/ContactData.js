import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ConatctData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalcode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Saiyam',
        address: {
          street: 'Test Street',
          zipCode: '45313',
          country: 'India'
        },
        email: 'saiyam@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading: false});
      });
  };

  render() {
    let form = (
      <form>
          <input type="text" name="name" placeholder="Name"></input>
          <input type="email" name="email" placeholder="Email"></input>
          <input type="text" name="street" placeholder="Street"></input>
          <input type="text" name="postal" placeholder="Postal Code"></input>
          <Button clicked={this.orderHandler} btnType="Success">Order</Button>
        </form>
    );
    if(this.state.loading) {
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

export default ConatctData;
