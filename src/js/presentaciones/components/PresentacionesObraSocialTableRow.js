/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPresentacionFormatoOsde, getPresentacionFormatoAMR } from '../api';
import { ABRIR_PRESENTACION, FETCH_ESTUDIOS_DE_UNA_PRESENTACION } from '../actionTypes';
import { FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL } from '../nueva-presentacion/actionTypes';
import { ModalVerPresentacion } from '../nueva-presentacion/components/Modals';
import AlertModal from '../../utilities/components/alert/AlertModal';

function PresentacionesObraSocialTableRow(props) {
    const { index, presentacion, history } = props;
    const {
        fecha, total_facturado: totalFacturado, estado,
        obra_social: obraSocial, total,
    } = props.presentacion;
    const [estadoPresentacion, setEstadoPresentacion] = useState(estado);
    const [modalVerEstudios, setModalVerEstudios] = useState(false);
    const [modalAbrirPresentacion, setModalAbrirPresentacion] = useState(false);

    const downloadPresentacionDigitalOsde = () => {
        getPresentacionFormatoOsde(props.presentacion);
    };

    const downloadPresentacionDigitalAmr = () => {
        getPresentacionFormatoAMR(props.presentacion);
    };

    const abrirPresentacion = () => {
        setEstadoPresentacion('Abierto');
        props.abrirPresentacion(index, presentacion);
    };

    const redirectPage = () => {
        if (estadoPresentacion === 'Abierto') {
            props.fetchEstudios(presentacion.id);
            setTimeout(() => {
                history.push('/presentaciones-obras-sociales/modificar-presentacion-abierta');
            }, 1000);
        } else {
            props.fetchEstudios(presentacion.id);
            setModalVerEstudios(true);
        }
    };

    return (
        <Fragment>
            <tr
              style={ { cursor: 'pointer' } }
              onClick={ redirectPage }
            >
                <td>{ fecha }</td>
                <td>{ estadoPresentacion }</td>
                <td>{ obraSocial.nombre }</td>
                <td>{ totalFacturado }</td>
                <td>{ total }</td>
                <td>
                    <a
                      href='#'
                      onClick={ downloadPresentacionDigitalOsde }
                    >
                        Osde
                    </a>
                    <span>&nbsp;|&nbsp;</span>
                    <a
                      href='#'
                      onClick={ downloadPresentacionDigitalAmr }
                    >
                        AMR
                    </a>
                    <span>&nbsp;|&nbsp;</span>
                    <a
                      onClick={ () => setModalAbrirPresentacion(true) }
                      role='button'
                      tabIndex='0'
                    >
                        Abrir
                    </a>
                </td>
            </tr>
            <ModalVerPresentacion
              show={ modalVerEstudios }
              onClickClose={ () => setModalVerEstudios(!modalVerEstudios) }
            />
            <AlertModal
              isOpen={ modalAbrirPresentacion }
              message='Estas seguro que deseas abrir la presentacion?'
              buttonStyle='danger'
              onClickDo={ abrirPresentacion }
              onClickClose={ () => setModalAbrirPresentacion(false) }
              doLabel='Si'
              dontLabel='No'
            />
        </Fragment>
    );
}

const { object, func, number } = PropTypes;

PresentacionesObraSocialTableRow.propTypes = {
    presentacion: object.isRequired,
    index: number.isRequired,
    abrirPresentacion: func.isRequired,
    fetchEstudios: func.isRequired,
    history: object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        abrirPresentacion: (index, presentacion) =>
            dispatch({ type: ABRIR_PRESENTACION, payload: { index, item: {
                ...presentacion,
                estado: 'Abierto',
            } } }),
        fetchEstudios: id =>
            dispatch({ type: FETCH_ESTUDIOS_DE_UNA_PRESENTACION, id }),
    };
}


export default withRouter(connect(null, mapDispatchToProps)(PresentacionesObraSocialTableRow));
