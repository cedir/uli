import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'react-bootstrap/dist/react-bootstrap';
import MontosAcumulados from './MontosAcumulados';

function CajaActionBar({
    openSearchCajaModal,
    history,
    apiLoading,
    consultorio1,
    consultorio2,
    general,
}) {
    const location = {
        pathname: '/caja/create',
        state: { montoAcumulado: consultorio1 + consultorio2 + general },
    };
    const createMovimientos = () => history.push(location);
    return (
        <Row>
            <Col md={ 8 }>
                <MontosAcumulados
                  general={ general }
                  consultorio1={ consultorio1 }
                  consultorio2={ consultorio2 }
                />
            </Col>
            <Col md={ 4 } >
                <div className='pull-right'>
                    <Button
                      onClick={ openSearchCajaModal }
                      disabled={ apiLoading }
                    >
                        Buscar movimiento
                    </Button>{' '}
                    <Button
                      onClick={ createMovimientos }
                      disabled={ apiLoading }
                    >
                        Crear Movimientos
                    </Button>
                </div>
            </Col>
        </Row>
    );
}

const { func, object, bool, number } = PropTypes;

CajaActionBar.propTypes = {
    openSearchCajaModal: func.isRequired,
    history: object.isRequired,
    apiLoading: bool.isRequired,
    consultorio1: number.isRequired,
    consultorio2: number.isRequired,
    general: number.isRequired,
};

function mapStateToProps(state) {
    return {
        apiLoading: state.cajaReducer.apiLoading,
        consultorio1: state.cajaReducer.montoConsultorio1,
        consultorio2: state.cajaReducer.montoConsultorio2,
        general: state.cajaReducer.montoGeneral,
    };
}

export default connect(mapStateToProps)(CajaActionBar);
