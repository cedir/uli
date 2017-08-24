import Rx from 'rxjs';
import store from '../app/configureStore';
import { config } from '../app/config';

const baseUrl = config.baseUrl;

function getDefaultHeaders() {
    const token = store.getState().login.token;

    return {
        Authorization: `Token ${token}`,
    };
}

export function get(partialUrl, customHeaders = {}) {
    const defaultHeaders = getDefaultHeaders();
    const url = `${baseUrl}${partialUrl}`;

    const headers = Object.assign(defaultHeaders, customHeaders);
    return Rx.Observable.ajax({
        method: 'GET',
        url,
        headers,
    });
}

export function unAuthenticatedPost(partialUrl, body, customHeaders) {
    const url = `${baseUrl}${partialUrl}`;

    const ajaxConf = {
        method: 'POST',
        url,
        body,
    };

    if (customHeaders) {
        ajaxConf.headers = customHeaders;
    }

    return Rx.Observable.ajax(ajaxConf);
}

export function post(partialUrl, body, customHeaders = {}) {
    const defaultHeaders = getDefaultHeaders();
    const url = `${baseUrl}${partialUrl}`;

    const headers = Object.assign(defaultHeaders, customHeaders);
    return Rx.Observable.ajax({
        method: 'POST',
        url,
        body,
        headers,
    });
}
