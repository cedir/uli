import React, { Fragment } from 'react';
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
    } = props;

    if (estudiosApiLoading) {
        return <LinearProgress className='md-progress' variant='query' />;
    }

    return (
        <Fragment>
            <table id='tabla' className='estudios-table'>
                <thead>
                    <tr className='titles'>
                        <th>Fecha</th>
                        <th>Orden</th>
                        <th>Afiliado</th>
                        <th>Paciente</th>
                        <th className='practica'>Practica</th>
                        <th>Actuante</th>
                        <th>Importe</th>
                        <th>Pension</th>
                        <th>Dif. Paciente</th>
                        <th className='medicacion'>Medicacion</th>
                        <th>Anestesista</th>
                        <th className='last-row-title icon' />
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
                        />))
                    }
                </tbody>
            </table>
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
    setImporteMedicacionEstudio: func.isRequired,
    gravado: string,
    eliminarEstudio: func,
    actualizarInput: func.isRequired,
};

export default EstudiosDeUnaPresentacionList;
