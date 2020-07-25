export const sumarImportesEstudios = (estudios) => {
    let importesTotales = 0;
    estudios.forEach((estudio) => {
        /* eslint-disable no-mixed-operators */
        importesTotales = importesTotales +
            parseFloat(estudio.importe_estudio, 10) +
            parseFloat(estudio.pension, 10) -
            parseFloat(estudio.diferencia_paciente, 10) +
            parseFloat(estudio.importe_medicacion) +
            parseFloat(estudio.arancel_anestesia, 10) + 0.0001;
    });
    importesTotales -= 0.0001;

    return importesTotales;
};
