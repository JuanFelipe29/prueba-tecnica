import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";

const AppBundle = (
    <ReduxProvider store={store}>
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </ReduxProvider>
);

ReactDOM.render(AppBundle, document.getElementById('root'));


serviceWorker.unregister();
