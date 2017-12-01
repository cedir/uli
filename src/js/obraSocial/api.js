import { get } from '../utilities/rest';

export function getObrasSociales(nombre) {
    const url = `/api/obra_social?nombre=${nombre}`;
    return get(url);
}
