import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import ContadorTableHeader from './ContadorTableHeader';
import ContadorTableRow from './ContadorTableRow';

function ContadorTable({ tiempos, usuarios, cantidadTurnos }) {
    return (
        <Table>
            <thead>
                <ContadorTableHeader tiempos={ tiempos } />
            </thead>
            <tbody>
                <ContadorTableRow
                  usuarios={ usuarios }
                  cantidadTurnos={ cantidadTurnos }
                />
            </tbody>
        </Table>
    );
}

const { array, object } = PropTypes;

ContadorTable.propTypes = {
    tiempos: array.isRequired,
    usuarios: array.isRequired,
    cantidadTurnos: object.isRequired,
};

export default ContadorTable;
