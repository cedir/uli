import React, { useState, useRef } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import NuevaPresentacionObraSocialList from '../list-rows/NuevaPresentacionObraSocialList';
import { ModalComprobante } from '../Modals';

function TabNavigator() {
    const [openComprobante, setOpenComprobate] = useState(false);
    const comprobanteHandler = () => {
        setOpenComprobate(!openComprobante);
    };
    const tableRef = useRef(null);
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
                  onClick={ comprobanteHandler }
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
