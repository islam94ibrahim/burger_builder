import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
  const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

  const sideDrawerCloseHandler = () => setSideDrawerVisible(false);

  const sideDrawerToggleHandler = () =>
    setSideDrawerVisible(!sideDrawerVisible);

  return (
    <Fragment>
      <Toolbar
        drawerToggleClicked={sideDrawerToggleHandler}
        isAuth={props.isAuthenticated}
      />
      <SideDrawer
        open={sideDrawerVisible}
        closed={sideDrawerCloseHandler}
        isAuth={props.isAuthenticated}
      />
      <main className={styles.Content}>{props.children}</main>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
