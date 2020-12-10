import { get } from '../../utilities/rest';

export function getDatosDeUnaPresentacion(id) {
    const url = `/api/presentacion/${id}/`;

    return get(url);
}
