import { getSucursal } from '../../app/storeHelper';
import { get, patch } from '../../utilities/rest';

export function getEstudiosDeUnaPresentacion(id) {
    const sucursal = getSucursal();
    const url = `/api/presentacion/${id}/estudios/?sucursal=${sucursal}`;

    return get(url);
}

export function updatePresentacionObraSocial(presentacion, id) {
    const sucursal = getSucursal();
    const url = `/api/presentacion/${id}/?sucursal=${sucursal}`;
    const body = {
        periodo: presentacion.periodo,
        fecha: presentacion.fecha,
        estudios: presentacion.estudios,
        sucursal,
    };
    const headers = {
        'Content-Type': 'application/json',
    };

    return patch(url, body, headers);
}
