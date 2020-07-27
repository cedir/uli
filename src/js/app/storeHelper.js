import store from './configureStore';

export function getSucursal() {
    const sucursal = store.getState().login.sucursal;

    return sucursal;
}
