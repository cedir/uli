import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import ModalFinalizarGuardar, { ModalComprobante } from './Modals';
import { LOAD_GRAVADO_VALUE_NUEVA } from '../nueva-presentacion/actionTypes';
import { LOAD_GRAVADO_VALUE_MODIFICAR } from '../actionTypes';

function useComprobanteState() {
    const [numeroShort, setNumeroShort] = useState('');
    const [numeroLong, setNumeroLong] = useState('');
    const [tipo, setTipo] = useState('');
    const [subTipo, setSubTipo] = useState('');
    const [responsable, setResponsable] = useState('');
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

function TabNavigator(props) {
    const {
        listComponent, loadGravadoValueNueva, loadGravadoValueModificar,
    } = props;
    const [openComprobante, setOpenComprobate] = useState(false);
    const [openFinalizarGuardar, setOpenFinalizarGuardar] = useState(false);
    const comprobanteState = useComprobanteState();

    useEffect(() => {
        if (listComponent.type.displayName === 'Connect(ModificarPresentacionList)') {
            loadGravadoValueModificar(comprobanteState.gravado);
        } else {
            loadGravadoValueNueva(comprobanteState.gravado);
        }
    }, [comprobanteState.gravado]);

    const comprobanteHandler = () => {
        setOpenComprobate(!openComprobante);
    };

    const finalizarGuardarHandler = () => {
        setOpenFinalizarGuardar(!openFinalizarGuardar);
    };

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
                    { listComponent }
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
              comprobanteState={ comprobanteState }
            />
        </div>
    );
}

TabNavigator.propTypes = {
    listComponent: PropTypes.object.isRequired,
    loadGravadoValueNueva: PropTypes.func.isRequired,
    loadGravadoValueModificar: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        loadGravadoValueNueva: (value) => {
            dispatch({ type: LOAD_GRAVADO_VALUE_NUEVA, payload: { value } });
        },
        loadGravadoValueModificar: (value) => {
            dispatch({ type: LOAD_GRAVADO_VALUE_MODIFICAR, payload: { value } });
        },
    };
}

export default connect(null, mapDispatchToProps)(TabNavigator);
