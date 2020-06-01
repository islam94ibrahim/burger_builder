import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios.orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount = () => {
    this.props.onFetchIngredients();
  };

  isPurchasable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingredient) => ingredients[ingredient])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  purchasHandler = () => {
    if (this.props.isAuthenticated) this.setState({ purchasing: true });
    else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchasCancelHandler = () => this.setState({ purchasing: false });

  purchasContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredeints can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BurgerControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.isPurchasable(this.props.ingredients)}
            ordered={this.purchasHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchasCancelled={this.purchasCancelHandler}
          purchasContinued={this.purchasContinueHandler}
          price={this.props.totalPrice}
        />
      );
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClose={this.purchasCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (name) => dispatch(actions.addIngredient(name)),
    onIngredientRemoved: (name) => dispatch(actions.removeIngredient(name)),
    onFetchIngredients: () => dispatch(actions.fetchIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
