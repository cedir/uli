import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// require('./favicon.ico'); // Tell webpack to load favicon.ico

/* eslint-disable no-unused-vars */
// Required to load footable plugins begin
import jQuery from 'jquery';
import bootstrap from 'bootstrap';
import slimscroll from 'jquery-slimscroll';
import metismenu from 'metismenu';
import FootableJS from './app/layout/footable/footable.all.min';
// Required to load footable plugins end

import App from './app/app';
import configureStore from './app/configureStore';
import inspinia from './app/layout/inspinia';
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

