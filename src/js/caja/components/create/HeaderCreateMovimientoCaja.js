import React from 'react';
import PropTypes from 'prop-types';
import { Col, Panel, Row } from 'react-bootstrap';
import BotonesForm from './BotonesForm';
import ViewAsociado from './ViewAsociado';

function HeaderCreateMovimientoCaja({
    selectEstudio,
    valid,
    asociarEstudio,
    estudioAsociado,
    montoAcumulado,
    totalGrilla,
    goBack,
}) {
    const totalGrillaView = Math.round(totalGrilla * 100) / 100 || 0.00;
    const style = { marginTop: '20px', marginBottom: '20px' };
    return (
        <Row>
            <Col md={ 6 }>
                <BotonesForm
                  selectEstudio={ selectEstudio }
                  valid={ valid }
                  estudioAsociado={ estudioAsociado }
                  asociarEstudio={ asociarEstudio }
                  style={ style }
                  goBack={ goBack }
                />
                <Row>
                    <Col md={ 5 }>
                        <Panel style={ style }>
                            <p> Monto acumulado: ${ montoAcumulado } </p>
                        </Panel>
                    </Col>
                    <Col md={ 5 }>
                        <Panel style={ style }>
                            <p>
                                Total Grilla: ${ totalGrillaView }
                            </p>
                        </Panel>
                    </Col>
                </Row>
            </Col>

            <Col md={ 5 }>
                <Row>
                    { Object.keys(estudioAsociado).length !== 0 && <ViewAsociado
                      estudioAsociado={ estudioAsociado }
                      asociarEstudio={ asociarEstudio }
                      style={ style }
                    /> }
                </Row>
            </Col>
        </Row>
    );
}

const { func, object, bool, number } = PropTypes;

HeaderCreateMovimientoCaja.propTypes = {
    selectEstudio: func.isRequired,
    valid: bool.isRequired,
    asociarEstudio: func.isRequired,
    estudioAsociado: object.isRequired,
    montoAcumulado: number.isRequired,
    totalGrilla: number.isRequired,
    goBack: func.isRequired,
};

export default HeaderCreateMovimientoCaja;
