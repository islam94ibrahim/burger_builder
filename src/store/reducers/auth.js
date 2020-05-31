import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initalState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { loading: true, error: null });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false,
      });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, {
        token: null,
        userId: null,
      });
    default:
      return state;
  }
};

export default reducer;
