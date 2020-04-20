import { get, patch } from '../../utilities/rest';

export function getEstudiosDeUnaPresentacion(id) {
    const url = `/api/presentacion/${id}/estudios`;

    return get(url);
}

export function updatePresentacionObraSocial(presentacion, id) {
    const url = `/api/presentacion/${id}/`;
    const body = {
        periodo: presentacion.periodo,
        fecha: presentacion.fecha,
        estudios: presentacion.estudios,
    };
    const headers = {
        'Content-Type': 'application/json',
    };

    return patch(url, body, headers);
}
