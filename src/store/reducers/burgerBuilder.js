import * as actionTypes from './../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initalState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENTS_PRICES = {
  salad: 0.3,
  cheese: 1,
  meat: 3,
  bacon: 2,
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const AddedIngredients = updateObject(state.ingredients, {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      });
      return updateObject(state, {
        ingredients: AddedIngredients,
        totalPrice:
          state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
        building: true,
      });
    case actionTypes.REMOVE_INGREDIENT:
      const removedIngredients = updateObject(state.ingredients, {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
      });
      return updateObject(state, {
        ingredients: removedIngredients,
        totalPrice:
          state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
        building: true,
      });
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
        building: false,
      });
    case actionTypes.FETCH_INGREDIENTS_FAIL:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default reducer;
