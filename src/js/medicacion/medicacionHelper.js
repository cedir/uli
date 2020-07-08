export function calculateImporteTotal(medicaciones) {
    let importeTotal;
    if (medicaciones && medicaciones.length > 0) {
        importeTotal = medicaciones
            .map(medicacion => parseFloat(medicacion.importe || medicacion.medicamento.importe))
            .reduce((importeAcum, currentImporte) => importeAcum + currentImporte);
    }
    return importeTotal.toFixed(2);
}
