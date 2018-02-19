import { get } from '../utilities/rest';

export function getMedicamentosByDescription(descripcion) {
    const url = `/api/medicamento/?nombre=${descripcion}`;
    return get(url);
}
