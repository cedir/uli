import { get } from '../utilities/rest';

export function getMedicosByTextSearch(searchText) {
    const url = `/api/medico?search_text=${searchText}`;
    return get(url);
}

export function getMedicosById(id) {
    const url = `/api/medico?id=${id}`;
    return get(url);
}

export function getMedicos(searchParams) {
    if (searchParams.id) {
        return getMedicosById(searchParams.id);
    }

    return getMedicosByTextSearch(searchParams.searchText);
}
