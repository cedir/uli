import { get } from '../utilities/rest';
import saveFile from '../utilities/saveFile';

export function getPresentacionesObraSocial(idObraSocial) {
    const url = `/api/presentacion/?obra_social=${idObraSocial}`;

    return get(url);
}

export function getPresentacionFormatoOsde(presentacion) {
    const {
        id,
        obra_social: obraSocial,
        fecha } = presentacion;

    const url = `/api/presentacion/${id}/get_detalle_osde`;
    const customHeader = {
        'Content-Type': 'text/plain',
    };

    get(url, customHeader, 'string')
        .subscribe((ajaxResponse) => {
            const fileName = `presentacion_${obraSocial.nombre}_${fecha}.txt`;
            saveFile(fileName, ajaxResponse.response);
        });
}

