import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';
import paymentMethods from './paymentMethods';

export default combineReducers({
  router: routerReducer,
  form: FormReducer,
  paymentMethods
});
