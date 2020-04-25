import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import ModalAgregarEstudio, { ModalFinalizarGuardar, ModalComprobante } from './Modals';
import { VACIAR_ESTUDIOS_AGREGAR } from '../nueva-presentacion/actionTypes';

function TabNavigator(props) {
    const {
        listComponent,
        comprobanteState,
        estudios,
        estudiosApiLoading,
        estudiosAgregar,
        estudiosAgregarApiLoading,
        fetchEstudiosAgregar,
        agregarEstudiosTabla,
        id,
        crearPresentacion,
        updatePresentacion,
        cerrarPresentacion,
        fecha,
        vaciarEstudiosAgregar,
    } = props;
    const [openComprobante, setComprobante] = useState(false);
    const [openFinalizarGuardar, setFinalizarGuardar] = useState(false);
    const [agregarEstudios, setAgregarEstudios] = useState(false);

    const agregarClickHandler = () => {
        fetchEstudiosAgregar(id);
        setAgregarEstudios(true);
    };

    const cerrarClickHandler = () => {
        setAgregarEstudios(false);
        vaciarEstudiosAgregar();
    };

    const isEmpty = !estudiosApiLoading && estudios.length ? ' empty' : '';

    return (
        <div className={ `tab-navigator${isEmpty}` }>
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
                  disabled={ estudios.length === 0 }
                >   Comprobante
                    <i className='fa fa-file-text' />
                </Button>
                <Button
                  role='button'
                  tabIndex='0'
                  bsStyle='primary'
                  className='finalizar'
                  onClick={ () => setFinalizarGuardar(true) }
                  disabled={ estudios.length === 0 }
                >   Finalizar
                    <i className='fa fa-calendar-check-o' />
                </Button>
                <Button
                  role='button'
                  tabIndex='0'
                  bsStyle='primary'
                  className='agregar-estudios'
                  onClick={ agregarClickHandler }
                  disabled={ estudios.length === 0 }
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
              estudios={ estudios }
              id={ id }
              crearPresentacion={ crearPresentacion }
              updatePresentacion={ updatePresentacion }
              cerrarPresentacion={ cerrarPresentacion }
            />
            <ModalAgregarEstudio
              show={ agregarEstudios }
              alert={ alert }
              onClickClose={ cerrarClickHandler }
              estudios={ estudios }
              estudiosAgregarApiLoading={ estudiosAgregarApiLoading }
              estudiosAgregar={ estudiosAgregar }
              agregarEstudiosTabla={ agregarEstudiosTabla }
            />
        </div>
    );
}

const { number, element, func, object, string, array, bool } = PropTypes;

TabNavigator.propTypes = {
    listComponent: element.isRequired,
    comprobanteState: object.isRequired,
    fetchEstudiosAgregar: func.isRequired,
    estudios: array.isRequired,
    estudiosApiLoading: bool.isRequired,
    estudiosAgregarApiLoading: bool.isRequired,
    estudiosAgregar: array.isRequired,
    agregarEstudiosTabla: func.isRequired,
    id: number.isRequired,
    crearPresentacion: func,
    updatePresentacion: func,
    cerrarPresentacion: func.isRequired,
    fecha: string.isRequired,
    vaciarEstudiosAgregar: func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        vaciarEstudiosAgregar: () =>
            dispatch({
                type: VACIAR_ESTUDIOS_AGREGAR,
            }),
    };
}

export default connect(null, mapDispatchToProps)(TabNavigator);
