import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import GameModel from './modules/GameModel';

const loggerMiddleware = createLogger(); // initialize logger

const createStoreWithMiddleware = applyMiddleware( loggerMiddleware)(createStore); // apply logger to redux

const reducer = combineReducers({
  GameModel
});

const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState);
export default configureStore;