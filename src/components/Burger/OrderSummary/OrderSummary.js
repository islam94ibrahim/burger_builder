import React, { Fragment } from 'react';

import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const ingerdientSummary = Object.keys(props.ingredients).map((ingredient) => (
    <li key={ingredient}>
      <span style={{ textTransform: 'capitalize' }}>{ingredient}</span> :{' '}
      {props.ingredients[ingredient]}
    </li>
  ));
  return (
    <Fragment>
      <h3>Your Order:</h3>
      <ul>{ingerdientSummary}</ul>
      <p>Continue with checkout?</p>
      <p>
        <strong>Total price: {props.price.toFixed(2)}</strong>
      </p>
      <Button btnType="Danger" clicked={props.purchasCancelled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.purchasContinued}>
        Continue
      </Button>
    </Fragment>
  );
};

export default OrderSummary;
