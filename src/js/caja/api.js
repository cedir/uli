import { get } from '../utilities/rest';

export function getMovimientos() {
    const url = '/api/caja/';
    return get(url);
}
