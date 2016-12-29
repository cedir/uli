import 'rxjs';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { merge } from 'rxjs/observable/merge';

export const userEpic = function(action$) {
  const a = action$
    .ofType("DO_LOGIN")
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mergeMap(action => action.userName === 'jiaguilera' && action.password === 'holamundo'
        ? of({ type: 'USER_LOGIN', user: {userName: action.userName, name: 'Ignacio Aguilera', role: 'Administrador'}})
        : empty()
        );

  return a.merge(action$
    .ofType("DO_LOGOUT")
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mergeMap(action => of({ type: 'USER_LOGOUT'}))
    );
};