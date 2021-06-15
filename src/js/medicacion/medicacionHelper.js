export function calculateImporteTotal(medicaciones) {
    let importeTotal = 0.00;
    if (medicaciones.length > 0) {
        importeTotal = medicaciones
            .map(medicacion => parseFloat(medicacion.importe || medicacion.medicamento.importe))
            .reduce((importeAcum, currentImporte) => importeAcum + currentImporte);
    }

    return importeTotal && importeTotal.toFixed(2);
}
