import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NuevaPresentacionObraSocialTableRow } from './NuevaPresentacionObraSocialTableRow';
import ImportesTotales from './ImportesTotales';
import initialState from '../estudiosSinPresentarReducerInitialState';

/* eslint-disable no-console */


function NuevaPresentacionObraSocialList(props) {
    const [sum, setSum] = useState(0);
    const tableRef = useRef();

    useEffect(() => {
        sumHandler();
        const setFromEvent = () => {
            sumHandler();
        };
        window.addEventListener('click', setFromEvent);
        return () => {
            window.removeEventListener('click', setFromEvent);
        };
    });

    const sumHandler = () => {
        const rows = tableRef.current.rows;
        let newSum = 0;
        for (let i = 0; i < rows.length; i += 1) {
            newSum += parseFloat(rows[i].cells[14].textContent, 10);
        }
        setSum(newSum);
    };

    const { estudiosSinPresentar, estudiosSinPresentarApiLoading, gravado } = props;
    return (
        <div>
            <table id='tabla' className='estudios-table'>
                <thead>
                    <tr className='titles'>
                        <th className='first-row-title' />
                        <th className='numero'>Nro</th>
                        <th>Fecha</th>
                        <th>Orden</th>
                        <th>Afiliado</th>
                        <th>Paciente</th>
                        <th>Practica</th>
                        <th>Actuante</th>
                        <th>Importe</th>
                        <th>Pension</th>
                        <th>Dif. Paciente</th>
                        <th>Medicacion</th>
                        <th>Anestesista</th>
                        <th className='last-row-title' />
                    </tr>
                </thead>
                <tbody ref={ tableRef }>
                    { estudiosSinPresentar.map(estudio => (
                        <NuevaPresentacionObraSocialTableRow
                          row={ estudio }
                          key={ estudio.id }
                          onKeyUp={ sumHandler }
                        />
                    )) }
                </tbody>
            </table>
            { !estudiosSinPresentarApiLoading &&
            <ImportesTotales
              estudios={ sum }
              gravado={ parseFloat(gravado, 10) }
            /> }
        </div>
    );
}

const { number, func, bool } = PropTypes;

NuevaPresentacionObraSocialList.propTypes = {
    estudiosSinPresentar: func.isRequired,
    estudiosSinPresentarApiLoading: bool.isRequired,
    gravado: number.isRequired,
};

NuevaPresentacionObraSocialList.propTypes = {
    estudiosSinPresentar: initialState.estudiosSinPresentar,
    estudiosSinPresentarApiLoading: initialState.estudiosSinPresentarApiLoading,
};

function mapStateToProps(state) {
    return {
        estudiosSinPresentar: state.estudiosSinPresentarReducer.estudiosSinPresentar,
        estudiosSinPresentarApiLoading:
            state.estudiosSinPresentarReducer.estudiosSinPresentarApiLoading,
    };
}

export default
    connect(mapStateToProps, null)(NuevaPresentacionObraSocialList);
