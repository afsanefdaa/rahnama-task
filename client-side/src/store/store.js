import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const configureStore = (initialState = {}) => {
  const isServer = typeof window === 'undefined';
  const isDev = process.env.NODE_ENV === 'development';

  const composeEnhancers = (isDev && !isServer && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    || compose;

  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(thunk),
  )(createStore);

  return createStoreWithMiddleware(rootReducer, initialState);
};

export default configureStore;
