import React, { useRef } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import ConnectedNuevaPresentacionObraSocialList from '../list-rows/NuevaPresentacionObraSocialList';

function TabNavigator() {
    const innerRef = useRef(null);
    return (
        <div className='tab-navigator'>
            <nav className='tabs'>
                <Button
                  role='button'
                  bsStyle='primary'
                  className='ayuda'
                  tabIndex='0'
                >   Ayuda
                    <i className='fas fa-question-circle' />
                </Button>
                <Button
                  role='button'
                  tabIndex='0'
                  bsStyle='primary'
                  className='comprobante'
                >   Comprobante
                    <i className='fas fa-file-invoice' />
                </Button>
                <Button
                  role='button'
                  tabIndex='0'
                  bsStyle='primary'
                  className='finalizar'
                >   Finalizar
                    <i className='fas fa-calendar-check' />
                </Button>
            </nav>
            <Row className='content-1'>
                <Col md={ 12 } className='col-1'>
                    <ConnectedNuevaPresentacionObraSocialList
                      ref={ innerRef }
                    />
                </Col>
            </Row>
        </div>
    );
}

export default TabNavigator;
