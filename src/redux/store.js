import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './root-reducer';
import { persistStore } from 'redux-persist';




const middlewares = [logger]; //array of all the middleware that needs to be invoked
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store); // this is to make our store persistent

export default {store, persistor};