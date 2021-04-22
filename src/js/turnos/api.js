import { post } from '../utilities/rest';

export function getCantidadTurnos(usuarios, tiemposDiff) {
    const url = '/api/turnos/contador_turnos/';

    const fechaHasta = new Date();

    const tiempos = tiemposDiff.map((tiempo) => {
        const fechaDesde = new Date();
        fechaDesde.setDate(fechaDesde.getDate() - tiempo);
        return [
            `${fechaDesde.getFullYear()}-${fechaDesde.getMonth() + 1}-${fechaDesde.getDate()}`,
            `${fechaHasta.getFullYear()}-${fechaHasta.getMonth() + 1}-${fechaHasta.getDate()}`,
        ];
    });

    const body = { usuarios, tiempos };

    const headers = { 'Content-Type': 'application/json' };

    return post(url, body, headers);
}
