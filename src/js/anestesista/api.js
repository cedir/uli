import { get } from '../utilities/rest';
import { getSucursal } from '../app/storeHelper';

export function getPagoAnestesista(id, año, mes) {
    const url = `/api/anestesista/${id}/pago/${año}/${mes}/?sucursal=${getSucursal()}`;
    return get(url);
}

export function getAnestesistas(searchText) {
    const url = `/api/anestesista/?search_text=${searchText}`;

    return get(url);
}

export function getAnestesistasList() {
    const url = '/api/anestesista/';

    return get(url);
}
