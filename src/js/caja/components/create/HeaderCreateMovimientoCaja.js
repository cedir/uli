import React from 'react';
import PropTypes from 'prop-types';
import { Col, Panel, Row } from 'react-bootstrap';
import BotonesForm from './BotonesForm';
import ViewAsociado from './ViewAsociado';
import { round } from '../../../utilities/utilFunctions';

function HeaderCreateMovimientoCaja({
    selectEstudio,
    asociarEstudio,
    estudioAsociado,
    montoAcumulado,
    totalGrilla,
}) {
    const totalGrillaView = round(totalGrilla) || 0.00;
    const style = { marginTop: '20px', marginBottom: '20px' };
    return (
        <Row>
            <Col md={ 6 }>
                <BotonesForm
                  selectEstudio={ selectEstudio }
                  estudioAsociado={ estudioAsociado }
                  asociarEstudio={ asociarEstudio }
                  style={ style }
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

const { func, object, number, string } = PropTypes;

HeaderCreateMovimientoCaja.propTypes = {
    selectEstudio: func.isRequired,
    asociarEstudio: func.isRequired,
    estudioAsociado: object.isRequired,
    montoAcumulado: string.isRequired,
    totalGrilla: number.isRequired,
};

export default HeaderCreateMovimientoCaja;
