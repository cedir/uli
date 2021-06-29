export const tiposMovimiento = [
    { text: 'General', value: 1 },
    { text: 'Honorario Médico', value: 2 },
    { text: 'Honorario Anestesista', value: 3 },
    { text: 'Medicación', value: 4 },
    { text: 'Práctica', value: 5 },
    { text: 'Descartable', value: 6 },
    { text: 'Material Específico', value: 7 },
    { text: 'Pago a Médico', value: 8 },
    { text: 'Consultorio 1', value: 9 },
    { text: 'Coseguro', value: 10 },
    { text: 'Egreso', value: 11 },
    { text: 'Consultorio 2', value: 12 },
];

export const ID_FACTURA = 1;
export const ID_LIQUIDACION = 2;
export const ID_NOTA_DE_DEBITO = 3;
export const ID_NOTA_DE_CREDITO = 4;
export const ID_FACTURA_ELECTRONICA = 5;
export const ID_NOTA_DE_DEBITO_ELECTRONICA = 6;
export const ID_NOTA_DE_CREDITO_ELECTRONICA = 7;

export const tiposComprobante = [
    { text: 'Factura', value: ID_FACTURA },
    { text: 'Liquidacion', value: ID_LIQUIDACION },
    { text: 'Nota De Debito', value: ID_NOTA_DE_DEBITO },
    { text: 'Nota De Credito', value: ID_NOTA_DE_CREDITO },
    { text: 'Factura Electronica', value: ID_FACTURA_ELECTRONICA },
    { text: 'Nota de Debito Electronica', value: ID_NOTA_DE_DEBITO_ELECTRONICA },
    { text: 'Nota de Credito Electronica', value: ID_NOTA_DE_CREDITO_ELECTRONICA },
];

export const opcionesIva = [
    { text: 'Exento', porcentaje: 0, gravado: 1 },
    { text: 'Iva inscripto 10.5', porcentaje: 10.5, gravado: 2 },
    { text: 'Iva inscripto 21', porcentaje: 21, gravado: 3 },
];

export const tiposAsociadoDefault = [
    ID_NOTA_DE_CREDITO,
    ID_LIQUIDACION,
    ID_NOTA_DE_CREDITO,
    ID_NOTA_DE_DEBITO,
    ID_NOTA_DE_CREDITO_ELECTRONICA,
    ID_NOTA_DE_CREDITO_ELECTRONICA,
    ID_NOTA_DE_DEBITO_ELECTRONICA,
];
