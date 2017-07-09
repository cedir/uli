import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './app/app';
import configureStore from './app/configureStore';
// require('./favicon.ico'); // Tell webpack to load favicon.ico

/* eslint-disable no-unused-vars */
import Custom from './../style/style.less';
import FooTable from './../style/footable.core.css';

const store = configureStore();

render(
    <Provider store={ store }>
        <Router>
            <Route path='/' component={ App } />
        </Router>
    </Provider>,
    document.getElementById('container'),
);

