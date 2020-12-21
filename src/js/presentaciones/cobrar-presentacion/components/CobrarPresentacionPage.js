import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NotFoundPage from '../../../utilities/components/NotFoundPage';
import CobrarPresentacionHeader from './CobrarPresentacionHeader';
import CobrarPresentacionBody from './CobrarPresentacionBody';

function CobrarPresentacionPage({ estudios, estudiosApiLoading }) {
    const showPage = !estudios.length && !estudiosApiLoading;
    return (
        <React.Fragment>
            {!showPage && (
                <React.Fragment>
                    <CobrarPresentacionHeader cargando={ estudiosApiLoading } />
                    <CobrarPresentacionBody
                      estudios={ estudios }
                      cargando={ estudiosApiLoading }
                    />
                </React.Fragment>
            )}
            {showPage && <NotFoundPage />}
        </React.Fragment>
    );
}

const { array, bool } = PropTypes;

CobrarPresentacionPage.propTypes = {
    estudios: array.isRequired,
    estudiosApiLoading: bool.isRequired,
};

function mapStateToProps(state) {
    return {
        estudios: state.cobrarPresentacionReducer.estudios,
        estudiosApiLoading: state.cobrarPresentacionReducer.estudiosApiLoading,
    };
}

export default connect(mapStateToProps)(CobrarPresentacionPage);
