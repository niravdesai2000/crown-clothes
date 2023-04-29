import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "./context/user.context";
import {ProductProvider} from "./context/product.context";
import {CartContextProvider} from "./context/cart.context";
import {Provider} from "react-redux";
import {persistor, store} from "./redux/store/store";
import { PersistGate } from 'redux-persist/integration/react';
import {Elements} from "@stripe/react-stripe-js";
import {stripePromise} from "./utils/strip/strip.utils";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Elements stripe={stripePromise}>
                        <App/>
                    </Elements>
                    {/*<UserProvider>*/}
                    {/*    <ProductProvider>*/}
                    {/*        <CartContextProvider>*/}
                            {/*</CartContextProvider>*/}
                        {/*</ProductProvider>*/}
                    {/*</UserProvider>*/}
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
