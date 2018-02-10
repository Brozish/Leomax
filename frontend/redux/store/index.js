import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import logger from '../middlewares/logger';
import { routerMiddleware } from 'react-router-redux';
import history from '../../history';

export const store = createStore(reducer, {}, applyMiddleware(
  routerMiddleware(history), logger
));
