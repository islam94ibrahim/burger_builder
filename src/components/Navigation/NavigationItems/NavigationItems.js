import React, { Fragment } from 'react';

import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {props.isAuth ? (
      <Fragment>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Fragment>
    ) : (
      <NavigationItem link="/auth">Login</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
