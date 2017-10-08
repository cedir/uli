import { isAlpha, isEmpty, isInt, isLength } from 'validator';
import moment from 'moment';

import constants from './constants';

const { dniLength } = constants.validations;

export function required(value) {
    return isEmpty(value) ? 'Campo requerido' : undefined;
}

export function alpha(value) {
    return isEmpty(value) || isAlpha(value) ? undefined : 'Solo letras';
}

export function dni(value) {
    return isEmpty(value) || (isInt(value) && isLength(value, { min: dniLength, max: dniLength })) ? undefined : 'No es un dni valido';
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
