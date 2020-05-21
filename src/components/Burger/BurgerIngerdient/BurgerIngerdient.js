import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './BurgerIngerdient.module.css';

class BurgerIngerdient extends Component {
  render() {
    let ingerdient = null;
    switch (this.props.type) {
      case 'bread-bottom':
        ingerdient = <div className={styles.BreadBottom}></div>;
        break;
      case 'bread-top':
        ingerdient = (
          <div className={styles.BreadTop}>
            <div className={styles.Seeds1}></div>
            <div className={styles.Seeds2}></div>
          </div>
        );
        break;
      case 'meat':
        ingerdient = <div className={styles.Meat}></div>;
        break;
      case 'cheese':
        ingerdient = <div className={styles.Cheese}></div>;
        break;
      case 'salad':
        ingerdient = <div className={styles.Salad}></div>;
        break;
      case 'bacon':
        ingerdient = <div className={styles.Bacon}></div>;
        break;
      default:
        ingerdient = null;
    }

    return ingerdient;
  }
}

BurgerIngerdient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngerdient;
