import Rx from 'rxjs';
import store from '../app/configureStore';
import { config } from '../app/config';

const baseUrl = config.baseUrl;

export function getDefaultHeaders() {
    const token = store.getState().login.token;

    return {
        Authorization: `Token ${token}`,
    };
}
// responseType parameter added to allow set it as string. This is used
// to download the content of a file as a plain string.
export function get(partialUrl, customHeaders = {}, responseType) {
    const defaultHeaders = getDefaultHeaders();
    const url = `${baseUrl}${partialUrl}`;

    const headers = Object.assign(defaultHeaders, customHeaders);
    return Rx.Observable.ajax({
        method: 'GET',
        url,
        headers,
        responseType: responseType || 'json',
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

export function update(partialUrl, body, customHeaders = {}) {
    const defaultHeaders = getDefaultHeaders();
    const url = `${baseUrl}${partialUrl}`;

    const headers = Object.assign(defaultHeaders, customHeaders);
    return Rx.Observable.ajax({
        method: 'PUT',
        url,
        body,
        headers,
    });
}

export function patch(partialUrl, body, customHeaders = {}) {
    const defaultHeaders = getDefaultHeaders();
    const url = `${baseUrl}${partialUrl}`;

    const headers = Object.assign(defaultHeaders, customHeaders);
    return Rx.Observable.ajax({
        method: 'PATCH',
        url,
        body,
        headers,
    });
}

export function remove(partialUrl) {
    const defaultHeaders = getDefaultHeaders();
    const url = `${baseUrl}${partialUrl}`;

    return Rx.Observable.ajax({
        method: 'DELETE',
        url,
        headers: defaultHeaders,
    });
}
