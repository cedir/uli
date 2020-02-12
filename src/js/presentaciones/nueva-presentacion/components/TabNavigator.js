import React, { useState, useRef } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import NuevaPresentacionObraSocialList from './NuevaPresentacionObraSocialList';
import { ModalComprobante, ModalFinalizarGuardar } from './Modals';

function useComprobanteState() {
    const [numeroShort, setNumeroShort] = useState('');
    const [numeroLong, setNumeroLong] = useState('');
    const [tipo, setTipo] = useState('Factura Electroncia');
    const [subTipo, setSubTipo] = useState('A');
    const [responsable, setResponsable] = useState('Cedir');
    const [gravado, setGravado] = useState('0.00');

    const numeroShortHandler = (e) => {
        setNumeroShort(e.target.value);
    };

    const numeroLongHandler = (e) => {
        setNumeroLong(e.target.value);
    };

    const tipoHandler = (e) => {
        setTipo(e.target.value);
    };

    const subTipoHandler = (e) => {
        setSubTipo(e.target.value);
    };

    const responsableHandler = (e) => {
        setResponsable(e.target.value);
    };

    const gravadoHandler = (e) => {
        setGravado(e.target.value);
    };

    return {
        numeroShort,
        numeroShortHandler,
        numeroLong,
        numeroLongHandler,
        tipo,
        tipoHandler,
        subTipo,
        subTipoHandler,
        responsable,
        responsableHandler,
        gravado,
        gravadoHandler,
    };
}

function TabNavigator() {
    const [openComprobante, setOpenComprobate] = useState(false);
    const [openFinalizarGuardar, setOpenFinalizarGuardar] = useState(false);
    const comprobanteState = useComprobanteState();
    const comprobanteHandler = () => {
        setOpenComprobate(!openComprobante);
    };

    const finalizarGuardarHandler = () => {
        setOpenFinalizarGuardar(!openFinalizarGuardar);
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
                  onClick={ finalizarGuardarHandler }
                >   Finalizar
                    <i className='fa fa-calendar-check-o' />
                </Button>
            </nav>
            <Row className='content-1'>
                <Col md={ 12 } className='col-1'>
                    <NuevaPresentacionObraSocialList
                      ref={ tableRef }
                      gravado={ comprobanteState.gravado }
                    />
                </Col>
            </Row>
            <ModalComprobante
              show={ openComprobante }
              onClickClose={ comprobanteHandler }
              componentState={ comprobanteState }
            />
            <ModalFinalizarGuardar
              show={ openFinalizarGuardar }
              onClickClose={ finalizarGuardarHandler }
            />
        </div>
    );
}

export default TabNavigator;
