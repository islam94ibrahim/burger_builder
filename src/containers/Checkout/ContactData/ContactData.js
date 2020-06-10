import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios.orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
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
        isEmail: true,
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
  });

  const [orderFormIsValid, setOrderFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = Object.keys(orderForm)
      .map((input) => {
        return { name: input, value: orderForm[input].value };
      })
      .reduce((obj, el) => {
        obj[el.name] = el.value;
        return obj;
      }, {});

    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentfier) => {
    // in nested objects, only first level object will be cloned and others will still be pointing at the original object, so this ensures a deep copy
    const updateOrderInput = updateObject(orderForm[inputIdentfier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentfier].validation
      ),
      touched: true,
    });
    const updateOrderForm = updateObject(orderForm, {
      [inputIdentfier]: updateOrderInput,
    });

    let fromIsValid = true;
    for (let identfier in updateOrderForm) {
      if (!updateOrderForm[identfier].valid) {
        fromIsValid = false;
        break;
      }
    }

    setOrderForm(updateOrderForm);
    setOrderFormIsValid(fromIsValid);
  };

  let form = (
    <form onSubmit={orderHandler}>
      {Object.keys(orderForm).map((input) => {
        return (
          <Input
            key={input}
            elementType={orderForm[input].elementType}
            elementConfig={orderForm[input].elementConfig}
            value={orderForm[input].value}
            changed={(event) => inputChangedHandler(event, input)}
            invalid={!orderForm[input].valid && orderForm[input].validation}
            touched={orderForm[input].touched}
          />
        );
      })}
      <Button
        btnType="Success"
        clicked={orderHandler}
        disabled={!orderFormIsValid}
      >
        Order
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={styles.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
