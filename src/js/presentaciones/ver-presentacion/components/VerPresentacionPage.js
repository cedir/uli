import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import initialState from '../../modificar-presentacion/modificarPresentacionReducerInitialState';
import NotFoundPage from '../../../utilities/components/NotFoundPage';
import BotonesCobrar from './BotonesCobrar';
import CobrarPresentacionEstudios from './CobrarPresentacionEstudios';

const VerPresentacionPage = ({ estudios, estudiosApiLoading, obraSocial }) => {
    const showPage = !estudios.length && !estudiosApiLoading;
    return (
        <Fragment>
            { !showPage && (
                <Fragment>
                    <h1>
                        {'Ver/Cobrar presentacion: '}
                        <strong>{obraSocial.nombre && obraSocial.nombre}</strong>
                    </h1>
                    <BotonesCobrar />
                    <CobrarPresentacionEstudios
                      estudios={ estudios }
                      estudiosApiLoading={ estudiosApiLoading }
                      obraSocial={ obraSocial }
                    />
                </Fragment>
            )}
            { showPage && (
                <NotFoundPage />
            )}
        </Fragment>
    );
};

const { array, bool, object } = PropTypes;

VerPresentacionPage.propTypes = {
    estudios: array.isRequired,
    estudiosApiLoading: bool.isRequired,
    obraSocial: object.isRequired,
};

VerPresentacionPage.defaultProps = {
    estudios: initialState.estudios,
    estudiosApiLoading: initialState.estudiosApiLoading,
    importesTotales: initialState.importesTotales,
    obraSocial: initialState.obraSocial,
};

function mapStateToProps(state) {
    return {
        estudios: state.modificarPresentacionReducer.estudios,
        estudiosApiLoading: state.modificarPresentacionReducer.estudiosApiLoading,
        obraSocial: state.modificarPresentacionReducer.obraSocial,
    };
}

export default connect(mapStateToProps)(VerPresentacionPage);
