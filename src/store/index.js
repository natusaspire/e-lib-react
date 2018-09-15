import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

import * as reducers from '@/reducers';

const store = createStore(
  combineReducers({
    routing: routerReducer,
    ...reducers
  }),
  applyMiddleware(thunk)
);

export default store;
