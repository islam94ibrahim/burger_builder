import React from 'react';

import styles from './Order.module.css';

const Order = (props) => {
  const ingredients = Object.keys(props.ingredients)
    .map((ingredient) => {
      return { name: ingredient, amount: props.ingredients[ingredient] };
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, [])
    .map((ingredient, index) => {
      return (
        <span
          style={{
            textTransform: 'capitalize',
            display: 'inline-bloc',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px',
            boxSizing: 'border-box',
          }}
          key={index}
        >
          {ingredient.name} ({ingredient.amount})
        </span>
      );
    });
  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
