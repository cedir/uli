import { isAlpha, isAlphanumeric, isEmpty, isInt, isLength } from 'validator';
import moment from 'moment';

import constants from './constants';
import { onlyNums } from './reduxFormNormalizers';

const { dniMinLength, dniMaxLength, cuitMaxLength } = constants.validations;

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
    return isEmpty(valueWithoutSpaces) || isAlpha(valueWithoutSpaces, 'es-ES') ? undefined : 'Solo letras';
}

export function alphaNum(value) {
    const valueWithoutSpaces = value ? value.replace(/\s+/g, '') : '';
    return isEmpty(valueWithoutSpaces) || isAlphanumeric(valueWithoutSpaces, 'es-ES') ? undefined : 'Solo alfanumericos';
}

export function dni(value) {
    const val = typeof value === 'undefined' ? '' : value;
    return isEmpty(val) || (isInt(val) && isLength(val, { min: dniMinLength, max: dniMaxLength })) ? undefined : 'No es un dni valido';
}

export function dateBeforeThan(fieldToCompareName, errorMessage) {
    return (value, allValues) => {
        const valCopy = typeof value === 'undefined' ? '' : `${value}`;
        const otherDate = allValues[fieldToCompareName];
        const isBefore = !otherDate || moment(valCopy).isBefore(otherDate) ||
            moment(valCopy).isSame(otherDate);
        return isEmpty(valCopy) || isBefore ? undefined : (errorMessage || 'El periodo es invalido');
    };
}
export function dateAfterThan(fieldToCompareName, errorMessage) {
    return (value, allValues) => {
        const valCopy = typeof value === 'undefined' ? '' : `${value}`;
        const otherDate = allValues[fieldToCompareName];
        const isAfter = !otherDate || moment(valCopy).isAfter(otherDate) ||
            moment(valCopy).isSame(otherDate);
        return isEmpty(valCopy) || isAfter ? undefined : (errorMessage || 'El periodo es invalido');
    };
}

export function integerValue(value) {
    const val = typeof value === 'undefined' ? '' : value;
    return isEmpty(val) || (isInt(val)) ? undefined : 'No es numero';
}

export function nonEmpty(value) {
    return value && value.length > 0 ? undefined : 'Debe poseer al menos uno';
}

export function dniOrCuit(value) {
    const valNum = onlyNums(value);
    const val = typeof valNum === 'undefined' ? '' : valNum;
    return isEmpty(val) || (isInt(val) && isLength(val, { min: dniMinLength, max: cuitMaxLength })) ? undefined : 'No es un documento valido';
}
