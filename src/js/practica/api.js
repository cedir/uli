import { get } from '../utilities/rest';

export function getPracticas(descripcion) {
    const url = `/api/practica/?descripcion=${descripcion}`;
    return get(url);
}
