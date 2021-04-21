import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import ContadorTableHeader from './ContadorTableHeader';
import ContadorTableRow from './ContadorTableRow';

function ContadorTable({ tiempos, usuarios, cantidadTurnos }) {
    return (
        <Table>
            <thead>
                <tr>
                    <ContadorTableHeader tiempos={ tiempos } />
                </tr>
            </thead>
            <tbody>
                { usuarios.map(usuario => (
                    <ContadorTableRow
                      usuario={ usuario }
                      cantidadTurnos={ cantidadTurnos[usuario] }
                    />
                    ))}
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
