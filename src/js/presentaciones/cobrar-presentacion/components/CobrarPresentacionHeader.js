import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import BotonesTitulo from './header/BotonesTitulo';
import { REFACTURAR_ESTUDIOS, RESETEAR_TODOS_LOS_IMPORTES } from '../actionTypes';

function CobrarPresentacionHeader({
    obraSocial,
    cobrada,
    cargando,
    resetImportes,
    refacturar,
    idPresentacion,
    estudiosRefacturar,
}) {
    return (
        <Row>
            <Col md={ 8 }>
                <h1>
                    Cobrar presentacion: <strong>{obraSocial.nombre}</strong>
                </h1>
            </Col>
            <Col md={ 4 }>
                <BotonesTitulo
                  desactivar={ cargando || cobrada }
                  resetImportes={ resetImportes }
                  refacturarEstudios={ refacturar }
                  idPresentacion={ idPresentacion }
                  estudiosRefacturar={ estudiosRefacturar }
                />
            </Col>
        </Row>
    );
}

const { object, bool, func, number, array } = PropTypes;

CobrarPresentacionHeader.propTypes = {
    obraSocial: object.isRequired,
    cobrada: bool.isRequired,
    cargando: bool.isRequired,
    resetImportes: func.isRequired,
    refacturar: func.isRequired,
    idPresentacion: number.isRequired,
    estudiosRefacturar: array,
};

function mapStateToProps(state) {
    return {
        obraSocial: state.cobrarPresentacionReducer.obraSocial,
        cobrada: state.cobrarPresentacionReducer.cobrada,
        estudiosRefacturar: state.cobrarPresentacionReducer.estudiosSeleccionados,
        idPresentacion: state.cobrarPresentacionReducer.id,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        resetImportes: () => dispatch({ type: RESETEAR_TODOS_LOS_IMPORTES }),
        refacturar: (idPresentacion, estudios) =>
            dispatch({ type: REFACTURAR_ESTUDIOS, idPresentacion, estudios }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CobrarPresentacionHeader);
