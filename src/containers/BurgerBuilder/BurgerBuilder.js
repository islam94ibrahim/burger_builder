import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios.orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onFetchIngredients();
  }, []);

  const isPurchasable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingredient) => ingredients[ingredient])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  const purchasHandler = () => {
    if (props.isAuthenticated) setPurchasing(true);
    else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchasCancelHandler = () => setPurchasing(false);

  const purchasContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = {
    ...props.ingredients,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = props.error ? <p>Ingredeints can't be loaded!</p> : <Spinner />;

  if (props.ingredients) {
    burger = (
      <Fragment>
        <Burger ingredients={props.ingredients} />
        <BurgerControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          price={props.totalPrice}
          purchasable={isPurchasable(props.ingredients)}
          ordered={purchasHandler}
          isAuth={props.isAuthenticated}
        />
      </Fragment>
    );

    orderSummary = (
      <OrderSummary
        ingredients={props.ingredients}
        purchasCancelled={purchasCancelHandler}
        purchasContinued={purchasContinueHandler}
        price={props.totalPrice}
      />
    );
  }

  return (
    <Fragment>
      <Modal show={purchasing} modalClose={purchasCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Fragment>
  );
};

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
