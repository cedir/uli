import { get } from '../utilities/rest';

export function getObrasSociales() {
    const url = '/api/obra_social';
    return get(url);
}
