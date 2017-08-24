import Rx from 'rxjs';
import { login } from './api';
import { SET_AUTHORIZATION_TOKEN, LOGIN_ERROR } from './actionTypes';

export function loginEpic(action$) {
    return action$.ofType('AUTHENTICATE_USER')
        .mergeMap((action) => {
            const { username, password } = action;
            return login(username, password)
            .map(data => ({ type: SET_AUTHORIZATION_TOKEN, data: data.response }))
            .catch(() => (Rx.Observable.of({
                type: LOGIN_ERROR,
            })));
        },
    );
}
