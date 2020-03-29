import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import ModalAgregarEstudio, { ModalFinalizarGuardar, ModalComprobante } from './Modals';

function TabNavigator(props) {
    const {
        listComponent,
        comprobanteState,
        fetchEstudiosAgregar,
        idObraSocial,
        fecha,
    } = props;
    const [openComprobante, setComprobante] = useState(false);
    const [openFinalizarGuardar, setFinalizarGuardar] = useState(false);
    const [openAgregarEstudio, setAgregarEstudios] = useState(false);

    const agregarEstudiosClickHandler = () => {
        setAgregarEstudios(true);
        fetchEstudiosAgregar(idObraSocial);
    };

    return (
        <div className='tab-navigator'>
            <nav className='tabs'>
                <Button
                  role='button'
                  bsStyle='primary'
                  className='ayuda'
                  tabIndex='0'
                  disabled
                >   Ayuda
                    <i className='fa fa-question-circle' />
                </Button>
                <Button
                  role='button'
                  tabIndex='0'
                  bsStyle='primary'
                  className='comprobante'
                  onClick={ () => setComprobante(true) }
                >   Comprobante
                    <i className='fa fa-file-text' />
                </Button>
                <Button
                  role='button'
                  tabIndex='0'
                  bsStyle='primary'
                  className='finalizar'
                  onClick={ () => setFinalizarGuardar(true) }
                >   Finalizar
                    <i className='fa fa-calendar-check-o' />
                </Button>
                <Button
                  role='button'
                  tabIndex='0'
                  bsStyle='primary'
                  className='agregar-estudios'
                  onClick={ agregarEstudiosClickHandler }
                >
                    Agregar
                </Button>
            </nav>
            <Row className='content-1'>
                <Col md={ 12 } className='col-1'>
                    { listComponent }
                </Col>
            </Row>
            <ModalComprobante
              show={ openComprobante }
              onClickClose={ () => setComprobante(false) }
              componentState={ comprobanteState }
            />
            <ModalFinalizarGuardar
              show={ openFinalizarGuardar }
              onClickClose={ () => setFinalizarGuardar(false) }
              comprobanteState={ comprobanteState }
              fecha={ fecha }
            />
            <ModalAgregarEstudio
              show={ openAgregarEstudio }
              onClickClose={ () => setAgregarEstudios(false) }
              idObraSocial={ idObraSocial }
            />
        </div>
    );
}

const { number, element, func, object, string } = PropTypes;

TabNavigator.propTypes = {
    listComponent: element.isRequired,
    comprobanteState: object.isRequired,
    fetchEstudiosAgregar: func.isRequired,
    idObraSocial: number.isRequired,
    fecha: string.isRequired,
};

export default TabNavigator;
