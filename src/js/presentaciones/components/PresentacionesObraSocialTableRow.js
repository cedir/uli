/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EyePlusIcon from 'mdi-react/EyePlusIcon';
import PencilPlusIcon from 'mdi-react/PencilPlusIcon';
import LockIcon from 'mdi-react/LockIcon';
import LockOpenIcon from 'mdi-react/LockOpenIcon';
import { getPresentacionFormatoOsde, getPresentacionFormatoAMR } from '../api';
import { ABRIR_PRESENTACION } from '../actionTypes';
import { FETCH_ESTUDIOS_DE_UNA_PRESENTACION } from '../modificar-presentacion/actionTypes';
import { FETCH_DATOS_DE_UNA_PRESENTACION } from '../cobrar-presentacion/actionTypes';
import AlertModal from '../../utilities/components/alert/AlertModal';
import { config } from '../../app/config';

function PresentacionesObraSocialTableRow(props) {
    const { presentacion, history, index } = props;
    const {
        id, fecha, total_facturado: totalFacturado, estado,
        obra_social: obraSocial, total_cobrado: totalCobrado,
    } = props.presentacion;
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
            props.fetchEstudios(presentacion.id, obraSocial, fecha);
            history.push('/presentaciones-obras-sociales/modificar-presentacion-abierta');
        } else {
            props.fetchPresentacion(presentacion.id, obraSocial, fecha);
            history.push(`/presentaciones-obras-sociales/cobrar-presentacion/${presentacion.id}`);
        }
    };

    const Lock = () => (
        estado === 'Pendiente' || estado === 'Cobrado' ? (
            <LockIcon
              onClick={ estado === 'Pendiente' ? () => setModalAbrirPresentacion(true) : () => {} }
              className={ estado === 'Cobrado' ? 'not-hover' : '' }
              title='Abrir presentacion'
            />
        ) : (
            <LockOpenIcon
              className='not-hover'
            />
        )
    );

    return (
        <Fragment>
            <tr>
                <td>{ fecha }</td>
                <td>{ estado }</td>
                <td>{ obraSocial && obraSocial.nombre }</td>
                <td>{ presentacion.comprobante.numero }</td>
                <td>{ totalFacturado }</td>
                <td>{ totalCobrado }</td>
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
                    <Lock />
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
                <td>
                    {estado !== 'Abierto' &&
                        <Button
                          bsStyle='link'
                          onClick={ () => window.open(`${config.baseUrl}/api/presentacion/${id}/imprimir_presentacion/`) }
                        >
                            <Glyphicon glyph='print' />
                        </Button>
                    }
                </td>
            </tr>
            <AlertModal
              isOpen={ modalAbrirPresentacion }
              content='Estas seguro que deseas abrir la presentacion?'
              buttonStyle='primary'
              onClickDo={ abrirPresentacion }
              onClickClose={ () => setModalAbrirPresentacion(false) }
              doLabel='Abrir'
              dontLabel='Cancelar'
            />
        </Fragment>
    );
}

const { object, func, number } = PropTypes;

PresentacionesObraSocialTableRow.propTypes = {
    presentacion: object.isRequired,
    abrirPresentacion: func.isRequired,
    fetchEstudios: func.isRequired,
    fetchPresentacion: func.isRequired,
    history: object.isRequired,
    index: number.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        abrirPresentacion: (id, index) =>
            dispatch({ type: ABRIR_PRESENTACION, id, index }),
        fetchEstudios: (id, obraSocial, fecha) =>
            dispatch({ type: FETCH_ESTUDIOS_DE_UNA_PRESENTACION, id, obraSocial, fecha }),
        fetchPresentacion: (id, obraSocial, fecha) =>
            dispatch({ type: FETCH_DATOS_DE_UNA_PRESENTACION, id, obraSocial, fecha }),
    };
}


export default withRouter(connect(null, mapDispatchToProps)(PresentacionesObraSocialTableRow));
