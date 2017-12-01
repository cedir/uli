import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl }
    from 'react-bootstrap/dist/react-bootstrap';
import { isEmpty } from 'lodash';

import initialProps from '../estudioReducerInitialState';

const EstudioDetailMain = (props) => {
    const estudio = props.estudioDetail;

    if (isEmpty(estudio)) {
        return (
            <div>Loading ...</div>
        );
    }

    const obraSocial = estudio.obra_social;
    const medicoActuante = estudio.medico;
    const medicoSolicitante = estudio.medico_solicitante;
    const paciente = estudio.paciente;
    const practica = estudio.practica;

    return (
        <form>
            <FormGroup>
                <ControlLabel>Fecha estudio</ControlLabel>
                <FormControl.Static>
                    { estudio.fecha }
                </FormControl.Static>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Obra social</ControlLabel>
                <FormControl.Static>
                    { obraSocial.nombre }
                </FormControl.Static>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Medico actuante</ControlLabel>
                <FormControl.Static>
                    { `${medicoActuante.apellido}, ${medicoActuante.nombre}` }
                </FormControl.Static>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Medico solicitante</ControlLabel>
                <FormControl.Static>
                    { `${medicoSolicitante.apellido}, ${medicoSolicitante.nombre}` }
                </FormControl.Static>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Paciente</ControlLabel>
                <FormControl.Static>
                    { `${paciente.apellido}, ${paciente.nombre}` }
                </FormControl.Static>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Practica</ControlLabel>
                <FormControl.Static>
                    { practica.descripcion }
                </FormControl.Static>
            </FormGroup>
        </form>
    );
};

const { object } = React.PropTypes;

EstudioDetailMain.propTypes = {
    estudioDetail: object.isRequired,
};

EstudioDetailMain.defaultProps = {
    estudioDetail: initialProps.estudioDetail,
};

function mapStateToProps(state) {
    return {
        estudioDetail: state.estudiosReducer.estudioDetail,
    };
}

export default connect(mapStateToProps)(EstudioDetailMain);
