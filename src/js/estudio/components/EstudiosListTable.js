import React from 'react';
import { connect } from 'react-redux';
import { Table }
    from 'react-bootstrap/dist/react-bootstrap';

const { array } = React.PropTypes;

const EstudiosListTable = props => (
    <div>
        <Table striped responsive style={ { marginTop: '20px' } }>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Nombre Paciente</th>
                    <th>Obra Social</th>
                    <th>Tipo de estudio</th>
                    <th>Medico actuante</th>
                    <th>Medico solicitante</th>
                </tr>
            </thead>
            <tbody>
                { props.estudios.map(estudio => (
                    <tr key={ estudio.id }>
                        <td>{ estudio.fecha }</td>
                        <td>{ `${estudio.paciente.apellido}, ${estudio.paciente.nombre}` }</td>
                        <td>{ estudio.obra_social.nombre }</td>
                        <td>{ estudio.practica.descripcion }</td>
                        <td>{ `${estudio.medico.apellido}, ${estudio.medico.nombre}` }</td>
                        <td>{ `${estudio.medico_solicitante.apellido}, ${estudio.medico_solicitante.nombre}` }</td>
                    </tr>
                )) }
            </tbody>
        </Table>
    </div>
);

EstudiosListTable.propTypes = {
    estudios: array.isRequired,
};

EstudiosListTable.defaultProps = {
    estudios: [],
};

function mapStateToProps(state) {
    return {
        estudios: state.estudiosReducer.estudios,
    };
}

export default connect(mapStateToProps)(EstudiosListTable);
