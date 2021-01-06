import React, { Fragment } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import ImportesTotales from './ImportesTotales';
import EstudiosDeUnaPresentacionTableRow from './EstudiosDeUnaPresentacionTableRow';

function EstudiosDeUnaPresentacionList(props) {
    const {
        estudios,
        estudiosApiLoading,
        importesTotales,
        gravado,
        eliminarEstudio,
        actualizarInput,
        setImporteMedicacionEstudio,
        seccion,
        importesActualizados = undefined,
        resetImporte = undefined,
        estudioSeleccionado = undefined,
    } = props;

    if (estudiosApiLoading) {
        return <LinearProgress className='md-progress' variant='query' />;
    }

    return (
        <Fragment>
            <Table
              className='estudios-table'
              striped
              bordered
              responsive
              size='sm'
            >
                <thead>
                    <tr>
                        {estudioSeleccionado && <th />}
                        <th>Fecha</th>
                        <th>Orden</th>
                        <th>Afiliado</th>
                        <th>Paciente</th>
                        <th>Practica</th>
                        <th>Actuante</th>
                        <th>Importe</th>
                        <th>Pension</th>
                        <th>Dif. Paciente</th>
                        <th className='medicacion'>Medicacion</th>
                        <th>Anestesista</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    { estudios.map(estudio => (
                        <EstudiosDeUnaPresentacionTableRow
                          estudio={ estudio }
                          key={ estudio.id }
                          index={ estudios.indexOf(estudio) }
                          eliminarEstudio={ eliminarEstudio }
                          actualizarInput={ actualizarInput }
                          setImporteMedicacionEstudio={ setImporteMedicacionEstudio }
                          resetImporte={ resetImporte }
                          seccion={ seccion }
                          importesActualizados={ importesActualizados }
                          estudioSeleccionado={ estudioSeleccionado }
                        />))
                    }
                </tbody>
            </Table>
            { estudios.length !== 0 &&
                <ImportesTotales
                  estudios={ importesTotales }
                  gravado={ gravado && parseFloat(gravado, 10) }
                />
            }
        </Fragment>
    );
}

const { string, array, number, func, bool } = PropTypes;

EstudiosDeUnaPresentacionList.propTypes = {
    estudios: array.isRequired,
    estudiosApiLoading: bool.isRequired,
    importesTotales: number.isRequired,
    setImporteMedicacionEstudio: func,
    gravado: string,
    eliminarEstudio: func,
    actualizarInput: func.isRequired,
    seccion: string.isRequired,
    importesActualizados: func,
    resetImporte: func,
    estudioSeleccionado: func,
};

export default EstudiosDeUnaPresentacionList;
