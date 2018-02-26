import { get, post, remove } from '../utilities/rest';

export function getMedicacion(estudioId) {
    const url = `/api/medicacion/?estudio=${estudioId}`;
    return get(url);
}

export function addMedicactionToEstudio(medicacion) {
    const url = '/api/medicacion/';

    return post(url, medicacion);
}

export function removeMedicacionFromEstudio(medicacion) {
    const url = `/api/medicacion/${medicacion.id}/`;

    return remove(url);
}
