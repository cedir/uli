import React, { useState, useRef } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import NuevaPresentacionObraSocialList from './NuevaPresentacionObraSocialList';
import { ModalComprobante } from './Modals';

function TabNavigator() {
    const [openComprobante, setOpenComprobate] = useState(false);
    const comprobanteHandler = () => {
        setOpenComprobate(!openComprobante);
    };
    const tableRef = useRef(null);
    const disableAyuda = true;
    return (
        <div className='tab-navigator'>
            <nav className='tabs'>
                <Button
                  role='button'
                  bsStyle='primary'
                  className='ayuda'
                  tabIndex='0'
                  disabled={ disableAyuda }
                >   Ayuda
                    <i className='fa fa-question-circle' />
                </Button>
                <Button
                  role='button'
                  tabIndex='0'
                  bsStyle='primary'
                  className='comprobante'
                  onClick={ comprobanteHandler }
                >   Comprobante
                    <i className='fa fa-file-text' />
                </Button>
                <Button
                  role='button'
                  tabIndex='0'
                  bsStyle='primary'
                  className='finalizar'
                >   Finalizar
                    <i className='fa fa-calendar-check-o' />
                </Button>
            </nav>
            <Row className='content-1'>
                <Col md={ 12 } className='col-1'>
                    <NuevaPresentacionObraSocialList
                      ref={ tableRef }
                    />
                </Col>
            </Row>
            <ModalComprobante
              show={ openComprobante }
              onClickClose={ comprobanteHandler }
            />
        </div>
    );
}

export default TabNavigator;
