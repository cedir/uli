import { post } from '../utilities/rest';

export function getCantidadTurnos(usuarios, tiempo) {
    const url = '/api/turnos/contador_turnos/';
    const body = { usuarios, tiempo };
    const headers = {
        'Content-Type': 'application/json',
    };

    return post(url, body, headers);
}
