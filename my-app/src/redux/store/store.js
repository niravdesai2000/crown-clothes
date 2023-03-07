import {applyMiddleware, compose, createStore} from "redux";
import {logger} from "redux-logger/src";
import {RootReducer} from "../reducer/rootReducer";

const middleware = [logger];
const enhancer = compose(applyMiddleware(...middleware));
export const store = createStore(RootReducer ,undefined,enhancer);