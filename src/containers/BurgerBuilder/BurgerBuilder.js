import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
  state = {
    ingerdients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0,
    },
  };
  render() {
    return (
      <Fragment>
        <Burger ingerdients={this.state.ingerdients} />
        <div>Controls</div>
      </Fragment>
    );
  }
}

export default BurgerBuilder;
