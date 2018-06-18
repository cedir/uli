import { isAlpha, isAlphanumeric, isEmpty, isInt, isLength } from 'validator';
import moment from 'moment';

import constants from './constants';

const { dniLength } = constants.validations;

export function required(value) {
    const valCopy = typeof value === 'undefined' ? '' : `${value}`;
    return isEmpty(valCopy) ? 'Campo requerido' : undefined;
}

export function requiredOption(value) {
    const validity = Array.isArray(value) && value.length === 1;
    if (validity) {
        return undefined;
    }

    return 'Campo requerido';
}

export function alpha(value) {
    const valueWithoutSpaces = value ? value.replace(/\s+/g, '') : '';
    return isEmpty(valueWithoutSpaces) || isAlpha(valueWithoutSpaces) ? undefined : 'Solo letras';
}

export function alphaNum(value) {
    const valueWithoutSpaces = value ? value.replace(/\s+/g, '') : '';
    return isEmpty(valueWithoutSpaces) || isAlphanumeric(valueWithoutSpaces) ? undefined : 'Solo alfanumericos';
}

export function dni(value) {
    const val = typeof value === 'undefined' ? '' : value;
    return isEmpty(val) || (isInt(val) && isLength(val, { min: dniLength, max: dniLength })) ? undefined : 'No es un dni valido';
}

export function dateBeforeThan(fieldToCompareName, errorMessage) {
    return (value, allValues) => {
        const otherDate = allValues[fieldToCompareName];
        const isBefore = !otherDate || moment(value).isBefore(otherDate) ||
            moment(value).isSame(otherDate);
        return isEmpty(value) || isBefore ? undefined : (errorMessage || 'El periodo es invalido');
    };
}
export function dateAfterThan(fieldToCompareName, errorMessage) {
    return (value, allValues) => {
        const otherDate = allValues[fieldToCompareName];
        const isAfter = !otherDate || moment(value).isAfter(otherDate) ||
            moment(value).isSame(otherDate);
        return isEmpty(value) || isAfter ? undefined : (errorMessage || 'El periodo es invalido');
    };
}
