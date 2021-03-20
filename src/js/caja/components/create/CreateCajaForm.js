import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, reduxForm, FieldArray } from 'redux-form';
import { Button, ButtonToolbar, Col, Panel, Row } from 'react-bootstrap';
import CreateMovimientosForm from './CreateMovimientosForm';
import { CREATE_MOVIMIENTOS_CAJA, ASOCIAR_ESTUDIO } from '../../actionTypes';
import ViewAsociado from './ViewAsociado';

function CreateCajaForm({
    createMovimiento,
    handleSubmit,
    history,
    valid,
    estudioAsociado,
    asociarEstudio,
    location,
}) {
    const fromCajaLocation = {
        pathname: '/estudios',
        state: { fromCaja: true },
    };

    const montoAcumulado = location.state.montoAcumulado;

    const [totalGrilla, setTotalGrilla] = useState(0.00);

    const selectEstudio = () => history.push(fromCajaLocation);

    return (
        <React.Fragment>

            <Row>
                <Col md={ 6 }>
                    <ButtonToolbar style={ { marginTop: '20px', marginBottom: '20px' } }>
                        <Button type='submit' bsStyle='primary' disabled={ !valid }>
                            Crear Movimientos
                        </Button>
                        <Button
                          bsStyle='primary'
                          onClick={ selectEstudio }
                        >
                                Asociar con Estudio
                        </Button>
                        { Object.keys(estudioAsociado).length !== 0 && <Button
                          onClick={ () => asociarEstudio({}) }
                        >
                                Eliminar Estudio
                        </Button>}
                    </ButtonToolbar>
                    <Row>
                        <Col md={ 5 }>
                            <Panel>
                                <p> Monto acumulado: ${ montoAcumulado } </p>
                            </Panel>
                        </Col>
                        <Col md={ 5 }>
                            <Panel>
                                <p> Total Grilla: ${ totalGrilla || 0.00 } </p>
                            </Panel>
                        </Col>
                    </Row>
                </Col>

                <Col md={ 5 } lg={ 5 } >
                    <Row>
                        { Object.keys(estudioAsociado).length !== 0 && <ViewAsociado
                          estudioAsociado={ estudioAsociado }
                          asociarEstudio={ asociarEstudio }
                        /> }
                    </Row>
                </Col>
            </Row>

            <Form
              onSubmit={ handleSubmit(movimientos =>
                createMovimiento({
                    movimientos,
                    estudioAsociado,
                }),
              ) }
            >
                <FieldArray
                  name='movimientos'
                  component={ CreateMovimientosForm }
                  setTotalGrilla={ setTotalGrilla }
                />
            </Form>
        </React.Fragment>
    );
}

const { func, object, bool } = PropTypes;

CreateCajaForm.propTypes = {
    createMovimiento: func.isRequired,
    handleSubmit: func.isRequired,
    history: object.isRequired,
    valid: bool.isRequired,
    estudioAsociado: object.isRequired,
    asociarEstudio: func.isRequired,
    location: object.isRequired,
};

const CreateCajaFormRedux = reduxForm({
    form: 'CreateCajaFormRedux',
    destroyOnUnmount: false,
    enableReinitialize: true,
})(CreateCajaForm);

function mapStateToProps(state) {
    return {
        estudioAsociado: state.cajaReducer.estudioAsociado,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createMovimiento: movimientos => dispatch({ type: CREATE_MOVIMIENTOS_CAJA, movimientos }),
        asociarEstudio: estudio => dispatch({ type: ASOCIAR_ESTUDIO, estudio }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCajaFormRedux);
