import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModificarPresentacionTableRow from './ModificarPresentacionTableRow';
import ImportesTotales from '../nueva-presentacion/components/ImportesTotales';
import initialState from '../presentacionReducerInitialState';

function ModificarPresentacionList(props) {
    const {
        estudiosDeUnaPresentacion,
        gravado,
        suma,
    } = props;

    return (
        <div>
            <table id='tabla' className='estudios-table'>
                <thead>
                    <tr className='titles'>
                        <th className='first-row-title icon' />
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
                        <th className='last-row-title delete' />
                    </tr>
                </thead>
                <tbody>
                    { estudiosDeUnaPresentacion.map(estudio => (
                        <ModificarPresentacionTableRow
                          row={ estudio }
                          key={ estudio.id }
                          index={ estudiosDeUnaPresentacion.indexOf(estudio) }
                        />))
                    }
                </tbody>
            </table>
            { estudiosDeUnaPresentacion.length !== 0 &&
                <ImportesTotales
                  estudios={ suma }
                  gravado={ parseFloat(gravado, 10) }
                />
            }
        </div>
    );
}

const { string, array, number } = PropTypes;

ModificarPresentacionList.propTypes = {
    estudiosDeUnaPresentacion: array.isRequired,
    suma: number.isRequired,
    gravado: string.isRequired,
};

ModificarPresentacionList.defaultProps = {
    estudiosDeUnaPresentacion: initialState.estudiosDeUnaPresentacion,
    suma: initialState.suma,
    gravado: initialState.gravado,
};

function mapStateToProps(state) {
    return {
        estudiosDeUnaPresentacion: state.presentacionReducer.estudiosDeUnaPresentacion,
        suma: state.presentacionReducer.suma,
        gravado: state.presentacionReducer.gravado,
    };
}

export default connect(mapStateToProps, null)(ModificarPresentacionList);
