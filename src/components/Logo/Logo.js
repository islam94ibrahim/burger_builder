import React from 'react';

import AppLogo from '../../assets/images/logo.png';
import styles from './Logo.module.css';

const Logo = () => (
  <div className={styles.Logo}>
    <img src={AppLogo} alt="MyBurger" />
  </div>
);

export default Logo;
