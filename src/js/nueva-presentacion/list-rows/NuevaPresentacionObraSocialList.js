import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import initialState from '../presentacionReducerInitialState';
import NuevaPresentacionObraSocialTableRow from './NuevaPresentacionObraSocialTableRow';

function NuevaPresentacionObraSocialList(props) {
    const { innerRef } = props;
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
                <tbody ref={ innerRef }>
                    { rows.map(row => (
                        <NuevaPresentacionObraSocialTableRow
                          row={ row }
                          key={ row.numero }
                        />
                    )) }
                </tbody>
            </table>
        </div>
    );
}

const rows = [
    {
        numero: 1, fecha: '01/12/2020', orden: '',
        numero_de_afiliado: '1234', paciente: 'Perez',
        practica: 'Video-Endoscopia', actuante: 'Doctor X',
        importe: 0, pension: 0, diferencia_paciente: 2800,
        medicacion: 1500, anestesista: 1234,
    },
    {
        numero: 2, fecha: '02/12/2020', orden: '',
        numero_de_afiliado: '1234', paciente: 'Perez',
        practica: 'Video-Endoscopia', actuante: 'Doctor X',
        importe: 0, pension: 0, diferencia_paciente: 2800,
        medicacion: 1500, anestesista: 1234,
    },
    {
        numero: 3, fecha: '03/12/2020', orden: '',
        numero_de_afiliado: '1234', paciente: 'Perez',
        practica: 'Video-Endoscopia', actuante: 'Doctor X',
        importe: 0, pension: 0, diferencia_paciente: 2800,
        medicacion: 1500, anestesista: 1234,
    },
    {
        numero: 4, fecha: '04/12/2020', orden: '',
        numero_de_afiliado: '1234', paciente: 'Perez',
        practica: 'Video-Endoscopia', actuante: 'Doctor X',
        importe: 0, pension: 0, diferencia_paciente: 2800,
        medicacion: 1500, anestesista: 1234,
    },
    {
        numero: 5, fecha: '05/12/2020', orden: '',
        numero_de_afiliado: '1234', paciente: 'Perez',
        practica: 'Video-Endoscopia', actuante: 'Doctor X',
        importe: 0, pension: 0, diferencia_paciente: 2800,
        medicacion: 1500, anestesista: 1234,
    },
    {
        numero: 6, fecha: '06/12/2020', orden: '',
        numero_de_afiliado: '1234', paciente: 'Perez',
        practica: 'Video-Endoscopia', actuante: 'Doctor X',
        importe: 0, pension: 0, diferencia_paciente: 2800,
        medicacion: 1500, anestesista: 1234,
    },
    {
        numero: 7, fecha: '07/12/2020', orden: '',
        numero_de_afiliado: '1234', paciente: 'Perez',
        practica: 'Video-Endoscopia', actuante: 'Doctor X',
        importe: 0, pension: 0, diferencia_paciente: 2800,
        medicacion: 1500, anestesista: 1234,
    },
    {
        numero: 8, fecha: '08/12/2020', orden: '',
        numero_de_afiliado: '1234', paciente: 'Perez',
        practica: 'Video-Endoscopia', actuante: 'Doctor X',
        importe: 0, pension: 0, diferencia_paciente: 2800,
        medicacion: 1500, anestesista: 1234,
    },
    {
        numero: 9, fecha: '09/12/2020', orden: '',
        numero_de_afiliado: '1234', paciente: 'Perez',
        practica: 'Video-Endoscopia', actuante: 'Doctor X',
        importe: 0, pension: 0, diferencia_paciente: 2800,
        medicacion: 1500, anestesista: 1234,
    },
    {
        numero: 10, fecha: '10/12/2020', orden: '',
        numero_de_afiliado: '1234', paciente: 'Perez',
        practica: 'Video-Endoscopia', actuante: 'Doctor X',
        importe: 0, pension: 0, diferencia_paciente: 2800,
        medicacion: 1500, anestesista: 1234,
    },
];

const { object } = PropTypes;

NuevaPresentacionObraSocialList.propTypes = {
    innerRef: object.isRequired,
};

NuevaPresentacionObraSocialList.defaultProps = {
    presentaciones: initialState.presentaciones,
};

function mapStateToProps(state) {
    return {
        presentaciones: state.presentacionReducer.presentaciones,
    };
}


const ConnectedNuevaPresentacionObraSocialList = connect(
    mapStateToProps,
)(NuevaPresentacionObraSocialList);

export default React.forwardRef((props, ref) =>
    <ConnectedNuevaPresentacionObraSocialList { ...props } innerRef={ ref } />,
);
