import React from 'react';
import PropTypes from 'prop-types';
import { Col, Well, Row } from 'react-bootstrap';
import ReciboInput from './ReciboInput';
import BotonesCobrar from './BotonesCobrar';

function ToolbarCobrar({
    retencionImpositiva,
    cargando,
    cobrada,
    setModalName,
    nroRecibo,
    setNroRecibo,
}) {
    const styles = {
        well: { marginBottom: '0rem', marginTop: '1rem' },
    };

    return (
        <React.Fragment>
            <Row className='tab-navigator'>
                <Col md={ 10 }>
                    <BotonesCobrar
                      cargando={ cargando }
                      cobrada={ cobrada }
                      setModalName={ setModalName }
                    />
                    <ReciboInput
                      nroRecibo={ nroRecibo }
                      setNroRecibo={ setNroRecibo }
                    />
                </Col>
                <Col md={ 2 } >
                    <Well bsSize='small' style={ styles.well }>
                        Retencion impositiva: {retencionImpositiva} - {retencionImpositiva === 32 ? 'AMR' : 'Directa'}
                    </Well>
                </Col>
            </Row>
        </React.Fragment>
    );
}

const { number, bool, func, string } = PropTypes;

ToolbarCobrar.propTypes = {
    retencionImpositiva: number.isRequired,
    cargando: bool.isRequired,
    cobrada: bool.isRequired,
    setModalName: func.isRequired,
    nroRecibo: string.isRequired,
    setNroRecibo: func.isRequired,
};

export default ToolbarCobrar;
