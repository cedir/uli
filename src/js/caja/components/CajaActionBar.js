import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'react-bootstrap/dist/react-bootstrap';
import MontosAcumulados from './MontosAcumulados';
import { querystring } from '../api';
import { config } from '../../app/config';

function CajaActionBar({
    openSearchCajaModal,
    history,
    apiLoading,
    montoConsultorio1,
    montoConsultorio2,
    montoGeneral,
    searchParams,
}) {
    const montoTotal = montoConsultorio1 + montoConsultorio2 + montoGeneral;
    const location = {
        pathname: '/caja/create',
        state: { montoAcumulado: montoTotal },
    };
    const createMovimientos = () => history.push(location);
    return (
        <Row>
            <Col md={ 7 }>
                <MontosAcumulados
                  general={ montoGeneral }
                  consultorio1={ montoConsultorio1 }
                  consultorio2={ montoConsultorio2 }
                  total={ montoTotal }
                />
            </Col>
            <Col md={ 5 } >
                <div className='pull-right'>
                    <Button
                      onClick={ openSearchCajaModal }
                      disabled={ apiLoading }
                    >
                        Buscar movimiento
                    </Button>{' '}
                    <Button
                      onClick={ () => window.open(`${config.baseUrl}/api/caja/imprimir/${querystring(searchParams, '')}`) }
                      disabled={ apiLoading }
                    >
                        Imprimir
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
    montoConsultorio1: number.isRequired,
    montoConsultorio2: number.isRequired,
    montoGeneral: number.isRequired,
    searchParams: object.isRequired,
};

function mapStateToProps(state) {
    return {
        apiLoading: state.cajaReducer.apiLoading,
        montoConsultorio1: Number(state.cajaReducer.montoConsultorio1),
        montoConsultorio2: Number(state.cajaReducer.montoConsultorio2),
        montoGeneral: Number(state.cajaReducer.montoGeneral),
    };
}

export default connect(mapStateToProps)(CajaActionBar);
