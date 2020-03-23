/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EyePlusIcon from 'mdi-react/EyePlusIcon';
import PencilPlusIcon from 'mdi-react/PencilPlusIcon';
import { Button } from 'react-bootstrap/dist/react-bootstrap';
import { getPresentacionFormatoOsde, getPresentacionFormatoAMR } from '../api';
import {
    ABRIR_PRESENTACION, FETCH_ESTUDIOS_DE_UNA_PRESENTACION,
} from '../actionTypes';
import { ModalVerPresentacion } from './Modals';
import AlertModal from '../../utilities/components/alert/AlertModal';

function PresentacionesObraSocialTableRow(props) {
    const { presentacion, history, index } = props;
    const {
        id, fecha, total_facturado: totalFacturado, estado,
        obra_social: obraSocial, total,
    } = props.presentacion;
    const [modalVerEstudios, setModalVerEstudios] = useState(false);
    const [modalAbrirPresentacion, setModalAbrirPresentacion] = useState(false);

    const downloadPresentacionDigitalOsde = () => {
        getPresentacionFormatoOsde(props.presentacion);
    };

    const downloadPresentacionDigitalAmr = () => {
        getPresentacionFormatoAMR(props.presentacion);
    };

    const abrirPresentacion = () => {
        props.abrirPresentacion(id, index);
        setModalAbrirPresentacion(false);
    };

    const redirectPage = () => {
        if (estado === 'Abierto') {
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
            <tr>
                <td>{ fecha }</td>
                <td>{ estado }</td>
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
                </td>
                <td>
                    {
                        estado === 'Pendiente' && (
                            <Button
                              onClick={ () => setModalAbrirPresentacion(true) }
                              style={ { outline: 'none' } }
                            >
                                Abrir
                            </Button>
                        )
                    }
                </td>
                <td>
                    {
                        estado !== 'Abierto' ? (
                            <EyePlusIcon
                              className='eye-plus-icon'
                              onClick={ redirectPage }
                            />
                        ) : (
                            <PencilPlusIcon
                              className='pencil-plus-icon'
                              onClick={ redirectPage }
                            />
                        )
                    }
                </td>
            </tr>
            <ModalVerPresentacion
              show={ modalVerEstudios }
              onClickClose={ () => setModalVerEstudios(!modalVerEstudios) }
            />
            <AlertModal
              isOpen={ modalAbrirPresentacion }
              message='Estas seguro que deseas abrir la presentacion?'
              buttonStyle='primary'
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
    abrirPresentacion: func.isRequired,
    fetchEstudios: func.isRequired,
    history: object.isRequired,
    index: number.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        abrirPresentacion: (id, index) =>
            dispatch({ type: ABRIR_PRESENTACION, id, index }),
        fetchEstudios: id =>
            dispatch({ type: FETCH_ESTUDIOS_DE_UNA_PRESENTACION, id }),
    };
}


export default withRouter(connect(null, mapDispatchToProps)(PresentacionesObraSocialTableRow));
