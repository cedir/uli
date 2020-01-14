import { get } from '../utilities/rest';

export function getEstudiosSinPresentarObraSocial(idObraSocial) {
    const url = `/api/obra_social/${idObraSocial}/estudios_sin_presentar`;

    return get(url);
}
