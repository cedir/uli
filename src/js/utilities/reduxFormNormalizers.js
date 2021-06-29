const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
});

export function onlyNums(value) {
    return value.replace(/[^\d]/g, '');
}

export function onlyDecimals(value) {
    return value.replace(/[^\d.]/g, '');
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

export function twoDecimals(value) {
    const valueNum = onlyDecimals(value);
    const formattedValue = formatter.format(valueNum);
    if (!value || value.slice(-1) === '.' || Number.isNaN(formattedValue)) {
        return valueNum;
    }
    return onlyDecimals(formattedValue);
}
