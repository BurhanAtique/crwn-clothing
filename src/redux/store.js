import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './root-reducer';

const INITIAL_STATE = {
    currentUser:null,
};

const middlewares = [logger]; //array of all the middleware that needs to be invoked
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;