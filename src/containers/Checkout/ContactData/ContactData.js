import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios.orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Islam Ibrahim',
        email: 'test@test.com',
        address: {
          street: 'test street',
          zip: '12345',
          country: 'Egypt',
        },
        deliveryMethod: 'fastest',
      },
    };

    this.setState({ loading: true });
    axios
      .post('/orders.json', order)
      .then((response) => {
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input name="name" type="text" placeholder="Your name" />
        <input name="email" type="text" placeholder="Your email" />
        <input name="street" type="text" placeholder="Your street" />
        <input name="postal" type="text" placeholder="Your Postal code" />
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
