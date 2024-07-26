import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import appStore from './src/store/appStore';
import AppRouter from './appRouter';
import './globalStyle.css';

import { Toaster } from 'react-hot-toast';

//const App = <h1>Hello</h1>

const App = () => {
    return (
        <Provider store={appStore}>
            <AppRouter />
            <Toaster />

        </Provider>
    )
};

const parent = document.getElementById("root");
const root = ReactDOM.createRoot(parent);
root.render(App());

