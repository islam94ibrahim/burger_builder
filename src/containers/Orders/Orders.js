import React, { Component } from 'react';
import Order from '../../components/Order/Order';

import axios from '../../axios.orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount = () => {
    axios
      .get('/orders.json')
      .then((response) => {
        const orders = [];
        for (let key in response.data) {
          orders.push({
            ...response.data[key],
            id: key,
          });
        }
        this.setState({ orders });
      })
      .catch((response) => {
        console.log(response);
      })
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
