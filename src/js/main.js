import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './app/configureStore';
// require('./favicon.ico'); // Tell webpack to load favicon.ico

/* eslint-disable no-unused-vars */
import Custom from './../style/style.less';
import FooTable from './../style/footable.core.css';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={ store }>
        <Router history={ history } routes={ routes } />
    </Provider>,
    document.getElementById('container'),
);

