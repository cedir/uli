import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NuevaPresentacionObraSocialTableRow } from './NuevaPresentacionObraSocialTableRow';
import initialState from '../estudiosSinPresentarReducerInitialState';


class NuevaPresentacionObraSocialList extends React.Component {
    render() {
        const { tableRef, estudiosSinPresentar } = this.props;
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
                            />
                        )) }
                    </tbody>
                </table>
            </div>
        );
    }
}

const { object, func } = PropTypes;

NuevaPresentacionObraSocialList.propTypes = {
    tableRef: object.isRequired,
    estudiosSinPresentar: func.isRequired,
};

NuevaPresentacionObraSocialList.propTypes = {
    estudiosSinPresentar: initialState.estudiosSinPresentar,
};

function mapStateToProps(state) {
    return {
        estudiosSinPresentar: state.estudiosSinPresentarReducer.estudiosSinPresentar,
    };
}

export default
    connect(mapStateToProps, null)(NuevaPresentacionObraSocialList);
