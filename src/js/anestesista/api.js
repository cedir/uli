import { get } from '../utilities/rest';

export function getPagoAnestesista(id, año, mes) {
    const url = `/api/anestesista/${id}/pago/${año}/${mes}/`;
    return get(url);
}

export function getAnestesistas(searchText) {
    const url = `/api/anestesista/?search_text=${searchText}`;

    return get(url);
}
