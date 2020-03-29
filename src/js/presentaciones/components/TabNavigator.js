import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import ModalFinalizarGuardar, { ModalComprobante } from './Modals';
import { LOAD_GRAVADO_VALUE_NUEVA } from '../nueva-presentacion/actionTypes';
import { LOAD_GRAVADO_VALUE_MODIFICAR } from '../actionTypes';
import NuevaPresentacionObraSocialList from '../nueva-presentacion/components/NuevaPresentacionObraSocialList';
import ModificarPresentacionList from '../modificar-presentacion/components/ModificarPresentacionList';

function useComprobanteState() {
    const [tipo, setTipo] = useState('');
    const [subTipo, setSubTipo] = useState('');
    const [responsable, setResponsable] = useState('');
    const [gravado, setGravado] = useState('0.00');

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
        if (listComponent === 'nueva') {
            loadGravadoValueNueva(comprobanteState.gravado);
        } else {
            loadGravadoValueModificar(comprobanteState.gravado);
        }
    }, [comprobanteState.gravado]);

    const comprobanteHandler = () => {
        setOpenComprobate(!openComprobante);
    };

    const finalizarGuardarHandler = () => {
        setOpenFinalizarGuardar(!openFinalizarGuardar);
    };

    const List = () => (
        listComponent === 'nueva' ? (
            <NuevaPresentacionObraSocialList />
        ) : (
            <ModificarPresentacionList />
        )
    );

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
                    <List />
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
    listComponent: PropTypes.string.isRequired,
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
