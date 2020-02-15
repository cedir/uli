import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NuevaPresentacionObraSocialTableRow from './NuevaPresentacionObraSocialTableRow';
import ImportesTotales from './ImportesTotales';
import initialState from '../estudiosSinPresentarReducerInitialState';
import { SUMAR_IMPORTES_ESTUDIOS } from '../actionTypes';

/* eslint-disable no-unused-vars */

function NuevaPresentacionObraSocialList(props) {
    const {
        estudiosSinPresentar,
        estudiosSinPresentarApiLoading,
        gravado,
        sumarImportesEstudios,
        suma,
    } = props;
    const [sumValues, setSumValues] = useState(suma);

    useEffect(() => {
        sumarImportesEstudios();
        setSumValues(suma);
        const setFromEvent = () => {
            sumarImportesEstudios();
            setSumValues(suma);
        };
        window.addEventListener('keyup', setFromEvent);
        return () => {
            window.removeEventListener('keyup', setFromEvent);
        };
    });

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
                { !estudiosSinPresentarApiLoading &&
                <ImportesTotales
                  estudios={ sumValues }
                  gravado={ parseFloat(gravado, 10) }
                /> }
            </table>
        </div>
    );
}

const { string, array, bool, func, number } = PropTypes;

NuevaPresentacionObraSocialList.propTypes = {
    estudiosSinPresentar: array.isRequired,
    suma: number.isRequired,
    estudiosSinPresentarApiLoading: bool.isRequired,
    sumarImportesEstudios: func.isRequired,
    gravado: string.isRequired,
};

NuevaPresentacionObraSocialList.defaultProps = {
    estudiosSinPresentar: initialState.estudiosSinPresentar,
    suma: initialState.suma,
    estudiosSinPresentarApiLoading: initialState.estudiosSinPresentarApiLoading,
};

function mapStateToProps(state) {
    return {
        estudiosSinPresentar: state.estudiosSinPresentarReducer.estudiosSinPresentar,
        suma: state.estudiosSinPresentarReducer.suma,
        estudiosSinPresentarApiLoading:
            state.estudiosSinPresentarReducer.estudiosSinPresentarApiLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sumarImportesEstudios: () =>
            dispatch({
                type: SUMAR_IMPORTES_ESTUDIOS,
            }),
    };
}

export default
    connect(mapStateToProps, mapDispatchToProps)(NuevaPresentacionObraSocialList);
