import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './app/configureStore.js';
//require('./favicon.ico'); // Tell webpack to load favicon.ico
import { syncHistoryWithStore } from 'react-router-redux';

import jQuery from 'jquery';
import metismenu from 'metismenu';
import bootstrap from 'bootstrap';
import slimscroll from 'jquery-slimscroll';
import inspinia from './app/layout/inspinia';
import FootableJS from './app/layout/footable/footable.all.min.js';

import Custom from './../style/style.less';
import FooTable from './../style/footable.core.css';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('container')
);

