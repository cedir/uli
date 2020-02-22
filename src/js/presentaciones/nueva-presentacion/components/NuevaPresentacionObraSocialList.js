import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NuevaPresentacionObraSocialTableRow from './NuevaPresentacionObraSocialTableRow';
import ImportesTotales from './ImportesTotales';
import initialState from '../estudiosSinPresentarReducerInitialState';

function NuevaPresentacionObraSocialList(props) {
    const {
        estudiosSinPresentar,
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
                    { estudiosSinPresentar.map(estudio => (
                        <NuevaPresentacionObraSocialTableRow
                          row={ estudio }
                          key={ estudio.id }
                        />
                    )) }
                </tbody>
                { estudiosSinPresentar.length !== 0 &&
                <ImportesTotales
                  estudios={ suma }
                  gravado={ parseFloat(gravado, 10) }
                /> }
            </table>
        </div>
    );
}

const { string, array, number } = PropTypes;

NuevaPresentacionObraSocialList.propTypes = {
    estudiosSinPresentar: array.isRequired,
    suma: number.isRequired,
    gravado: string.isRequired,
};

NuevaPresentacionObraSocialList.defaultProps = {
    estudiosSinPresentar: initialState.estudiosSinPresentar,
    suma: initialState.suma,
};

function mapStateToProps(state) {
    return {
        estudiosSinPresentar: state.estudiosSinPresentarReducer.estudiosSinPresentar,
        suma: state.estudiosSinPresentarReducer.suma,
        estudiosSinPresentarApiLoading:
            state.estudiosSinPresentarReducer.estudiosSinPresentarApiLoading,
    };
}

export default
    connect(mapStateToProps, null)(NuevaPresentacionObraSocialList);
