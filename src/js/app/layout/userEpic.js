import Rx from 'rxjs';

export const userEpic = function(action$) {
  const login = action$
    .ofType("DO_LOGIN")
    .delay(1000) // Asynchronously wait 1000ms then continue
    .filter(action => action.userName === 'jiaguilera' && action.password === 'holamundo')
    .map(action => ({ 
      type: 'USER_LOGIN',
      user: {
        userName: action.userName,
        name: 'Ignacio Aguilera',
        role: 'Administrador'
        }
      })
      );

  const logout = action$
    .ofType("DO_LOGOUT")
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mapTo({ type: 'USER_LOGOUT'});

  return Rx.Observable.merge(login,logout);
};