import { get } from '../utilities/rest';

export function getPresentacionesObraSocial(idObraSocial) {
    const url = `/api/presentacion/?obra_social=${idObraSocial}`;

    return get(url);
}
