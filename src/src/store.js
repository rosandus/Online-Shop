import { compose, applyMiddleware, createStore } from 'redux';
import { autoRehydrate, persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { createLogger } from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from './reducers';

const middleware = applyMiddleware(promise(), thunk, createLogger())

const store = createStore(
  persistCombineReducers({
    key: 'root',
    storage
  }, reducer),
  {},
  compose(middleware),
);

persistStore(store);


export default store;