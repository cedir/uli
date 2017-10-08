import { get } from '../utilities/rest';

export function getMedicos(searchText) {
    const url = `/api/medico?search_text=${searchText}`;
    return get(url);
}
