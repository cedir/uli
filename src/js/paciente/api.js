import { get } from '../utilities/rest';

export function getPacientes(searchText) {
    const url = `/api/paciente/?search_text=${searchText}`;
    return get(url);
}
