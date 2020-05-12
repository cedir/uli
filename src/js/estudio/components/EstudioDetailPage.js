import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap/dist/react-bootstrap';
import { isEmpty } from 'lodash';
import EstudioDetailMain from './EstudioDetailMain';
import MedicacionEstudio from './MedicacionEstudio';
import DetalleFacturacionEstudio from './DetalleFacturacionEstudio';
import ImportesEstudio from './ImportesEstudio';
import { FETCH_ESTUDIO_DETAIL, RESET_ESTUDIO_DETAIL } from '../actionTypes';
import { FETCH_MEDICACION_ESTUDIO } from '../../medicacion/actionTypes';

function EstudioDetailPage({
    fetchEstudioDetail,
    fetchMedicacionEstudio,
    resetEstudioDetail,
    estudioDetail,
    ...props
}) {
    useEffect(() => {
        fetchEstudioDetail(props.match.params.id);
        fetchMedicacionEstudio(props.match.params.id);
        return () => { resetEstudioDetail(); };
    }, []);

    const { paciente, practica } = estudioDetail;
    const [
        esPagoContraFactura,
        setPagoContraFactura,
    ] = useState(estudioDetail.esPagoContraFactura !== 0);

    return (
        <div className='container-fluid'>
            { paciente && practica &&
            <div>
                <h2>Paciente: { ` ${paciente.apellido}, ${paciente.nombre}.`} </h2>
            </div>
            }
            { !isEmpty(estudioDetail) && <Row className='show-grid'>
                <Col md={ 4 } style={ { border: 'none' } }>
                    <h3 style={ { marginBottom: '25px' } } >Detalle</h3>
                    <EstudioDetailMain
                      estudioDetailFormMode='edit'
                    />
                </Col>
                <Col md={ 4 } style={ { border: 'none' } }>
                    <h3 style={ { marginBottom: '25px' } } >Medicacion</h3>
                    <MedicacionEstudio />
                </Col>
                <Col md={ 4 } style={ { border: 'none' } }>
                    <h3 style={ { marginBottom: '25px' } } >Facturacion</h3>
                    <DetalleFacturacionEstudio esPagoContraFactura={ esPagoContraFactura } />
                    <h3 style={ { marginTop: '25px' } } >Importes</h3>
                    <ImportesEstudio
                      setPagoContraFactura={ setPagoContraFactura }
                      esPagoContraFactura={ esPagoContraFactura }
                    />
                </Col>
            </Row> }
        </div>
    );
}

const { object, func } = PropTypes;

EstudioDetailPage.propTypes = {
    match: object.isRequired,
    fetchEstudioDetail: func.isRequired,
    fetchMedicacionEstudio: func.isRequired,
    estudioDetail: object.isRequired,
    resetEstudioDetail: func.isRequired,
};

function mapStateToProps(state) {
    return {
        estudioDetail: state.estudiosReducer.estudioDetail,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEstudioDetail: estudioId =>
            dispatch({ type: FETCH_ESTUDIO_DETAIL, estudioId }),
        fetchMedicacionEstudio: estudioId =>
            dispatch({ type: FETCH_MEDICACION_ESTUDIO, estudioId }),
        resetEstudioDetail: () => dispatch({ type: RESET_ESTUDIO_DETAIL }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EstudioDetailPage);
