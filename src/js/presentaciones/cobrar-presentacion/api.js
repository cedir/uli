import { getSucursal } from '../../app/storeHelper';
import { get, patch } from '../../utilities/rest';

export function getDatosDeUnaPresentacion(id) {
    const sucursal = getSucursal();
    const url = `/api/presentacion/${id}/?sucursal=${sucursal}`;

    return get(url);
}

export function cobrarPresentacion(idPresentacion, estudios, nroRecibo, retencionImpositiva) {
    const sucursal = getSucursal();
    const url = `/api/presentacion/${idPresentacion}/cobrar/?sucursal=${sucursal}`;

    const body = {
        estudios: estudios.map(estudio => ({
            id: estudio.id,
            importe_cobrado_pension: estudio.pension,
            importe_cobrado_arancel_anestesia: estudio.arancel_anestesia,
            importe_estudio_cobrado:
                parseFloat(estudio.importe_estudio, 10) -
                parseFloat(estudio.diferencia_paciente, 10),
            importe_medicacion_cobrado: estudio.importe_medicacion,
        })),
        retencion_impositiva: retencionImpositiva,
        nro_recibo: nroRecibo,
        sucursal,
    };

    const headers = {
        'Content-Type': 'application/json',
    };

    return patch(url, body, headers);
}

export function refacturarEstudios(idPresentacion, estudios) {
    const sucursal = getSucursal();
    const url = `/api/presentacion/${idPresentacion}/refacturar_estudios/?sucursal=${sucursal}`;

    const body = {
        estudios,
    };

    const headers = {
        'Content-Type': 'application/json',
    };

    return patch(url, body, headers);
}
