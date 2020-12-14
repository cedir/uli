import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import EstudiosDeUnaPresentacionList from '../../components/EstudiosDeUnaPresentacionList';
import { RESETEAR_IMPORTE_ESTUDIO, ACTUALIZAR_INPUT_ESTUDIO_DE_COBRAR_PRESENTACION, RESETEAR_TODOS_LOS_IMPORTES, IMPORTES_ACTUALIZADOS } from '../actionTypes';
import NotFoundPage from '../../../utilities/components/NotFoundPage';
import BotonesCobrar from './BotonesCobrar';

function CobrarPresentacionPage({
    resetImporte,
    importesTotales,
    actualizarInput,
    estudios,
    estudiosApiLoading,
    obraSocial,
    resetImportes,
    importesActualizados,
}) {
    const showPage = !estudios.length && !estudiosApiLoading;
    return (
        <React.Fragment>
            { !showPage && (
                <React.Fragment>
                    <Row>
                        <Col md={ 10 }>
                            <h1>
                                {'Cobrar presentacion: '}
                                <strong>{obraSocial.nombre && obraSocial.nombre}</strong>
                            </h1>
                        </Col>
                        <Col md={ 2 }>
                            <Button
                              onClick={ resetImportes }
                              style={ { marginTop: '2rem' } }
                            >
                                Reset importes
                            </Button>
                        </Col>
                    </Row>
                    <BotonesCobrar cargando={ estudiosApiLoading } />
                    <EstudiosDeUnaPresentacionList
                      estudios={ estudios }
                      estudiosApiLoading={ estudiosApiLoading }
                      importesTotales={ importesTotales }
                      actualizarInput={ actualizarInput }
                      obraSocial={ obraSocial }
                      resetImporte={ resetImporte }
                      seccion='cobrar-presentacion'
                      importesActualizados={ importesActualizados }
                    />
                </React.Fragment>
            )}
            { showPage && (
                <NotFoundPage />
            )}
        </React.Fragment>
    );
}


const { number, func, array, bool, object } = PropTypes;

CobrarPresentacionPage.propTypes = {
    resetImporte: func.isRequired,
    actualizarInput: func.isRequired,
    importesTotales: number.isRequired,
    estudios: array.isRequired,
    estudiosApiLoading: bool.isRequired,
    obraSocial: object.isRequired,
    resetImportes: func.isRequired,
    importesActualizados: func,
};

function mapStateToProps(state) {
    return {
        estudios: state.cobrarPresentacionReducer.estudios,
        estudiosApiLoading: state.cobrarPresentacionReducer.estudiosApiLoading,
        importesTotales: state.cobrarPresentacionReducer.importesTotales,
        obraSocial: state.cobrarPresentacionReducer.obraSocial,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actualizarInput: (index, input, value) =>
            dispatch({
                type: ACTUALIZAR_INPUT_ESTUDIO_DE_COBRAR_PRESENTACION, index, input, value,
            }),
        resetImportes: () => dispatch({ type: RESETEAR_TODOS_LOS_IMPORTES }),
        importesActualizados: id => dispatch({ type: IMPORTES_ACTUALIZADOS, id }),
        resetImporte: id =>
            dispatch({ type: RESETEAR_IMPORTE_ESTUDIO, estudioId: id }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CobrarPresentacionPage);
