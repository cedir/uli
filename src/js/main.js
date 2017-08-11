import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// require('./favicon.ico'); // Tell webpack to load favicon.ico

/* eslint-disable no-unused-vars */
// Required to load footable plugins begin
import jQuery from 'jquery';
import bootstrap from 'bootstrap';
import metismenu from 'metismenu';
import slimscroll from 'jquery-slimscroll';
import FootableJS from './app/layout/footable/footable.all.min';
import inspinia from './app/layout/inspinia';
// Required to load footable plugins end

import App from './app/app';
import configureStore from './app/configureStore';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import Custom from './../style/style.less';
import FooTable from './../style/footable.core.css';

const store = configureStore();

render(
    <Provider store={ store }>
        <Router>
            <Route path='/' component={ App } />
        </Router>
    </Provider>,
    document.getElementById('wrapper'),
);

