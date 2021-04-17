import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import ContadorTableHeader from './ContadorTableHeader';
import ContadorTableRow from './ContadorTableRow';

function ContadorTable({ tiempos, cantTurnos }) {
    return (
        <Table>
            <thead>
                <tr>
                    <ContadorTableHeader tiempos={ tiempos } />
                </tr>
            </thead>
            <tbody>
                <tr>
                    <ContadorTableRow nombre='dani' cantTurnos={ cantTurnos } />
                </tr>
            </tbody>
        </Table>
    );
}

const { array } = PropTypes;

ContadorTable.propTypes = {
    tiempos: array.isRequired,
    cantTurnos: array.isRequired,
};

export default ContadorTable;
