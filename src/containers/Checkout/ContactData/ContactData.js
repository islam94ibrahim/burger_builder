import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios.orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
        },
        value: '',
        validation: {
          required: true,
          length: 5,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        validation: {},
        valid: true,
      },
    },
    isOrderFormValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    const formData = Object.keys(this.state.orderForm)
      .map((input) => {
        return { name: input, value: this.state.orderForm[input].value };
      })
      .reduce((obj, el) => {
        obj[el.name] = el.value;
        return obj;
      }, {});

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
    };

    this.props.onOrderBurger(order);
  };

  inputChangedHandler = (event, inputIdentfier) => {
    const updateOrderForm = { ...this.state.orderForm };
    // in nested objects, only first level object will be cloned and others will still be pointing at the original object, so this ensures a deep copy
    const updateOrderInput = { ...updateOrderForm[inputIdentfier] };
    updateOrderInput.value = event.target.value;
    updateOrderInput.valid = this.checkValidity(
      updateOrderInput.value,
      updateOrderInput.validation
    );
    updateOrderInput.touched = true;
    updateOrderForm[inputIdentfier] = updateOrderInput;

    let fromIsValid = true;
    for (let identfier in updateOrderForm) {
      if (!updateOrderForm[identfier].valid) {
        fromIsValid = false;
        break;
      }
    }

    this.setState({
      orderForm: updateOrderForm,
      isOrderFormValid: fromIsValid,
    });
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) isValid = value.trim() !== '' && isValid;

    if (rules.length) isValid = value.length === rules.length && isValid;

    return isValid;
  };

  render() {
    let form = (
      <form onSubmit={this.orderHandler}>
        {Object.keys(this.state.orderForm).map((input) => {
          return (
            <Input
              key={input}
              elementType={this.state.orderForm[input].elementType}
              elementConfig={this.state.orderForm[input].elementConfig}
              value={this.state.orderForm[input].value}
              changed={(event) => this.inputChangedHandler(event, input)}
              invalid={
                !this.state.orderForm[input].valid &&
                this.state.orderForm[input].validation
              }
              touched={this.state.orderForm[input].touched}
            />
          );
        })}
        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.isOrderFormValid}
        >
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
