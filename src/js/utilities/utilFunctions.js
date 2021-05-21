export const round = number => Math.round(number * 100) / 100;

export const getArray = (dato) => {
    if (dato && Array.isArray(dato)) {
        return dato;
    }
    return [];
};
