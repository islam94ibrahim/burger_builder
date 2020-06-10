import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios.orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

const Orders = (props) => {
  useEffect(() => {
    props.onFetchOrders(props.token, props.userId);
  }, []);

  if (props.loading) {
    return <Spinner />;
  }

  return (
    <div>
      {props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
