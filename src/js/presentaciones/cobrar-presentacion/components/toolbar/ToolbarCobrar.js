import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Well, Row } from 'react-bootstrap';
import ReciboInput from './ReciboInput';
import BotonesCobrar from './BotonesCobrar';

function ToolbarCobrar({
    retencionImpositiva,
    cargando,
}) {
    const [nroRecibo, setNroRecibo] = useState('');
    const styles = {
        well: { marginBottom: '0rem', marginTop: '1rem' },
    };

    return (
        <React.Fragment>
            <Row className='tab-navigator'>
                <Col md={ 10 }>
                    <BotonesCobrar
                      cargando={ cargando }
                      nroRecibo={ nroRecibo }
                      retencionImpositiva={ retencionImpositiva }
                    />
                    <ReciboInput
                      nroRecibo={ nroRecibo }
                      setNroRecibo={ setNroRecibo }
                    />
                </Col>
                <Col md={ 2 }>
                    <Well bsSize='small' style={ styles.well }>
                        Retencion impositiva: {retencionImpositiva} - {retencionImpositiva === 32 ? 'AMR' : 'Directa'}
                    </Well>
                </Col>
            </Row>
        </React.Fragment>
    );
}

const { number, bool } = PropTypes;

ToolbarCobrar.propTypes = {
    retencionImpositiva: number.isRequired,
    cargando: bool.isRequired,
};

function mapStateToProps(state) {
    const { se_presenta_por_AMR: AMR } = state.cobrarPresentacionReducer.obraSocial;
    const retencionImpositiva = Number(AMR) ? 32 : 25;
    return {
        retencionImpositiva,
    };
}

export default connect(mapStateToProps)(ToolbarCobrar);
