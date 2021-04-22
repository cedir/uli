import { post } from '../utilities/rest';

export function getCantidadTurnos(usuarios) {
    const url = '/api/turnos/contador_turnos/';

    const fechaDesde = new Date();
    const fechaHasta = new Date();

    fechaDesde.setDate(fechaDesde.getDate() - 31);

    const body = {
        usuarios,
        fecha_hasta: `${fechaHasta.getFullYear()}-${fechaHasta.getMonth() + 1}-${fechaHasta.getDate()}`,
        fecha_desde: `${fechaDesde.getFullYear()}-${fechaDesde.getMonth() + 1}-${fechaDesde.getDate()}`,
    };

    const headers = {
        'Content-Type': 'application/json',
    };

    return post(url, body, headers);
}