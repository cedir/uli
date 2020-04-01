import { get, post } from '../../utilities/rest';

export function getEstudiosSinPresentarObraSocial(idObraSocial) {
    const url = `/api/obra_social/${idObraSocial}/estudios_sin_presentar`;

    return get(url);
}

export function crearNuevaPresentacionObraSocial(presentacion) {
    const url = '/api/presentacionn/';
    const body = {
        obra_social_id: presentacion.obra_social_id,
        periodo: presentacion.periodo,
        fecha: presentacion.fecha,
        estado: presentacion.estado,
        estudios: presentacion.estudios,
    };
    const headers = {
        'Content-Type': 'application/json',
    };

    return post(url, body, headers);
}

export function guardarPresentacionObraSocial(presentacion) {
    // TODO: CAMBIAR URL
    const url = '/api/presentacion/guardar';
    const body = {
        obra_social_id: presentacion.obra_social_id,
        periodo: presentacion.periodo,
        fecha: presentacion.fecha,
        estado: presentacion.estado,
        estudios: presentacion.estudios,
        comprobante: presentacion.comprobante,
    };
    const headers = {
        'Content-Type': 'application/json',
    };

    return post(url, body, headers);
}
