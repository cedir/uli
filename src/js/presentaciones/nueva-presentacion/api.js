import { get, post, patch } from '../../utilities/rest';
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
    const sucursal = store.getState().login.sucursal;
    const body = {
        obra_social_id: presentacion.obra_social_id,
        periodo: presentacion.periodo,
        fecha: presentacion.fecha,
        estado: presentacion.estado,
        estudios: presentacion.estudios,
        sucursal,
    };
    const headers = {
        'Content-Type': 'application/json',
    };

    return post(url, body, headers);
}

export function cerrarNuevapresentacionObraSocial(id, comprobante) {
    const url = `/api/presentacion/${id}/cerrar/`;
    const body = {
        tipo_comprobante_id: comprobante.tipo_id,
        nro_terminal: comprobante.nro_terminal,
        sub_tipo: comprobante.sub_tipo,
        responsable: comprobante.responsable,
        gravado_id: comprobante.gravado_id,
    };
    const headers = {
        'Content-Type': 'application/json',
    };

    return patch(url, body, headers);
}
