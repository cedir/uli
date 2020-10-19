export function onlyNums(value) {
    return value.replace(/[^\d]/g, '');
}

export function normalizeDniCuit(value) {
    if (!value) {
        return value;
    }

    const documento = onlyNums(value);

    if (documento.length <= 8) {
        return documento;
    }

    if (documento.length <= 10) {
        return `${documento.slice(0, 2)}-${documento.slice(2, 10)}`;
    }

    return `${documento.slice(0, 2)}-${documento.slice(2, 10)}-${documento.slice(10, 12)}`;
}
