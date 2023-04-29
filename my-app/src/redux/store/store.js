import {applyMiddleware, compose, createStore} from "redux";
import {logger} from "redux-logger/src";
import {RootReducer} from "../reducer/rootReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./root-saga";


const sagaMiddleware = createSagaMiddleware();
const middleware = [logger,sagaMiddleware];
const enhancer = compose(applyMiddleware(...middleware));
const persistConfig = {
    'key':'root',
    storage,
    blacklist: ['user']
};
const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = createStore(persistedReducer ,undefined,enhancer);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);