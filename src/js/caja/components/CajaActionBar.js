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
    montoTotal,
    searchParams,
}) {
    const location = { pathname: '/caja/create' };
    const createMovimientos = () => history.push(location);

    return (
        <Row style={ { marginBottom: '3rem' } }>
            <Col md={ 7 }>
                <MontosAcumulados
                  general={ montoGeneral }
                  consultorio1={ montoConsultorio1 }
                  consultorio2={ montoConsultorio2 }
                  total={ montoTotal }
                />
            </Col>
            <Col md={ 5 }>
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

const { func, object, bool, string } = PropTypes;

CajaActionBar.propTypes = {
    openSearchCajaModal: func.isRequired,
    history: object.isRequired,
    apiLoading: bool.isRequired,
    montoConsultorio1: string.isRequired,
    montoConsultorio2: string.isRequired,
    montoGeneral: string.isRequired,
    montoTotal: string.isRequired,
    searchParams: object.isRequired,
};

function mapStateToProps(state) {
    return {
        apiLoading: state.cajaReducer.apiLoading,
        montoConsultorio1: state.cajaReducer.montoConsultorio1,
        montoConsultorio2: state.cajaReducer.montoConsultorio2,
        montoGeneral: state.cajaReducer.montoGeneral,
        montoTotal: state.cajaReducer.montoTotal,
    };
}

export default connect(mapStateToProps)(CajaActionBar);
