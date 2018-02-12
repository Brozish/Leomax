import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';
import paymentMethods from './paymentMethods';
import paymentDates from './paymentDates';

export default combineReducers({
  router: routerReducer,
  form: FormReducer,
  paymentMethods,
  paymentDates
});
