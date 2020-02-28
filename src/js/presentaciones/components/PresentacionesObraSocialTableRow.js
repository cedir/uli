/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPresentacionFormatoOsde, getPresentacionFormatoAMR } from '../api';
import { ABRIR_PRESENTACION, FETCH_ESTUDIOS_DE_UNA_PRESENTACION } from '../actionTypes';
import { FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL } from '../nueva-presentacion/actionTypes';
import { ModalVerPresentacion } from '../nueva-presentacion/components/Modals';

function PresentacionesObraSocialTableRow(props) {
    const { index, presentacion, history } = props;
    const {
        fecha, total_facturado: totalFacturado, estado,
        obra_social: obraSocial, total,
    } = props.presentacion;
    const [estadoPresentacion, setEstadoPresentacion] = useState(estado);
    const [showModal, setShowModal] = useState(false);

    const downloadPresentacionDigitalOsde = () => {
        getPresentacionFormatoOsde(props.presentacion);
    };

    const downloadPresentacionDigitalAmr = () => {
        getPresentacionFormatoAMR(props.presentacion);
    };

    const abrirPresentacion = () => {
        props.abrirPresentacion(index, presentacion);
        setEstadoPresentacion('Abierto');
    };

    const redirectPage = () => {
        if (estadoPresentacion === 'Abierto') {
            props.fetchEstudios(presentacion.id);
            setTimeout(() => {
                history.push('/presentaciones-obras-sociales/modificar-presentacion-abierta');
            }, 5000);
        } else {
            props.fetchEstudios(presentacion.id);
            setShowModal(true);
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
                      onClick={ abrirPresentacion }
                      role='button'
                      tabIndex='0'
                    >
                        Abrir
                    </a>
                </td>
            </tr>
            <ModalVerPresentacion
              show={ showModal }
              onClickClose={ () => setShowModal(!showModal) }
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
