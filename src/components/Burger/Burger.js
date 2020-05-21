import React from 'react';
import PropTypes from 'prop-types';

import styles from './Burger.module.css';
import BurgerIngerdient from './BurgerIngerdient/BurgerIngerdient';

const Burger = (props) => {
  let transformedIngerdients = Object.keys(props.ingerdients)
    .map((ingerdient) => {
      return [...Array(props.ingerdients[ingerdient])].map((_, index) => (
        <BurgerIngerdient key={ingerdient + index} type={ingerdient} />
      ));
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngerdients.length === 0) {
    transformedIngerdients = <p>Please start adding ingerdients!</p>;
  }

  return (
    <div className={styles.Burger}>
      <BurgerIngerdient type="bread-top" />
      {transformedIngerdients}
      <BurgerIngerdient type="bread-bottom" />
    </div>
  );
};

Burger.prototype = {
  ingerdients: PropTypes.object.isRequired,
};

export default Burger;
