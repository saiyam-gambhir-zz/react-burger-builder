import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('orders.json').then((response) => {
      const fetchedOrders = [];
      for(let key in response.data) {
        fetchedOrders.push({
          ...response.data[key],
          id: key
        });
      }
      this.setState({ loading: false, orders: fetchedOrders });
    }).catch(err => {
      this.setState({ loading: false });
    });
  };

  render() {
    let orders = (
      <div>
        { this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price} />))
        }
      </div>
    )

    if(this.state.orders.length === 0) {
      orders = <h1 style={{textAlign: "center", margin: '100px 0'}}>No Order Found !</h1>
    }

    if(this.state.loading) {
      orders = <Spinner />;
    }

    return orders;
  }
}

export default withErrorHandler(Orders, axios);
