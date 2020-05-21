import React from 'react';

import styles from './Burger.module.css';
import BurgerIngerdient from './BurgerIngerdient/BurgerIngerdient';

const Burger = (props) => {
  return (
    <div className={styles.Burger}>
      <BurgerIngerdient type="bread-top" />
      <BurgerIngerdient type="cheese" />
      <BurgerIngerdient type="bacon" />
      <BurgerIngerdient type="meat" />
      <BurgerIngerdient type="bread-bottom" />
    </div>
  );
};

export default Burger;
