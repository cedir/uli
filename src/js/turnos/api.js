import { post } from '../utilities/rest';

export function getCantidadTurnos(usuarios, fechas) {
    const url = '/api/turnos/contador_turnos/';

    const dateToStr = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const today = dateToStr(new Date());

    const body = { usuarios, fechas: fechas.map(fecha => [fecha, today]) };

    const headers = { 'Content-Type': 'application/json' };

    return post(url, body, headers);
}
