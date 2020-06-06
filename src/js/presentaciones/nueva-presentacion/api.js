import { get, post } from '../../utilities/rest';
import store from '../../app/configureStore';

export function getSucursal() {
    const sucursal = store.getState().login.sucursal;

    return sucursal;
}

export function getEstudiosSinPresentarObraSocial(idObraSocial) {
    const sucursal = getSucursal();
    const url = `/api/obra_social/${idObraSocial}/estudios_sin_presentar?sucursal=${sucursal}`;

    return get(url);
}

export function guardarNuevaPresentacionObraSocial(presentacion) {
    const url = '/api/presentacion/';
    const body = {
        obra_social_id: presentacion.obra_social_id,
        periodo: presentacion.periodo,
        fecha: presentacion.fecha,
        estado: presentacion.estado,
        estudios: presentacion.estudios,
        sucursal: getSucursal(),
    };
    const headers = {
        'Content-Type': 'application/json',
    };

    return post(url, body, headers);
}
