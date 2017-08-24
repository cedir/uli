import { get } from '../utilities/rest';

export function getPagoAnestesista(id, año, mes) {
    const url = `/api/anestesista/${id}/pago/${año}/${mes}/`;
    return get(url);
}
