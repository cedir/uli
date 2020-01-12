import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NuevaPresentacionObraSocialTableRow } from './NuevaPresentacionObraSocialTableRow';
import { config } from '../../app/config';
import { getDefaultHeaders } from '../../utilities/rest';
import initialState from '../../obraSocial/obraSocialReducerInitialState';


class NuevaPresentacionObraSocialList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            estudios: [],
        };
    }
    componentDidMount() {
        const idObraSocial = 1;
        console.log(this.props.fetchObrasSociales);
        const baseUrl = config.baseUrl;
        const url = `/api/obra_social/${idObraSocial}/estudios_sin_presentar`;
        const myHeaders = getDefaultHeaders();
        const options = {
            method: 'GET',
            headers: myHeaders,
            url,
        };
        fetch(`${baseUrl}${url}`, options)
            .then(response => response.json())
            .then(result => this.setState({ estudios: result }))
            .catch(error => console.log(error));
    }
    render() {
        const { estudios } = this.state;
        const { tableRef } = this.props;
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
                        { estudios.map(estudio => (
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

/* const rows = [
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
]; */

const { object, func } = PropTypes;

NuevaPresentacionObraSocialList.propTypes = {
    tableRef: object.isRequired,
    fetchObrasSociales: func.isRequired,
};

NuevaPresentacionObraSocialList.propTypes = {
    fetchObrasSociales: initialState.fetchObrasSociales,
};

function mapStateToProps(state) {
    return {
        fetchObrasSociales: state.obraSocialReducer.fetchObrasSociales,
    };
}

export default
    connect(mapStateToProps)(NuevaPresentacionObraSocialList);
