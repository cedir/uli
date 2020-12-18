import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NotFoundPage from '../../../utilities/components/NotFoundPage';
import CobrarPresentacionHeader from './CobrarPresentacionHeader';
import CobrarPresentacionBody from './CobrarPresentacionBody';

function CobrarPresentacionPage({ estudios, estudiosApiLoading, cobrada }) {
    const showPage = !estudios.length && !estudiosApiLoading;
    return (
        <React.Fragment>
            {!showPage && (
                <React.Fragment>
                    <CobrarPresentacionHeader cobrada={ cobrada } />
                    <CobrarPresentacionBody
                      estudios={ estudios }
                      cargando={ estudiosApiLoading }
                      cobrada={ cobrada }
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
    cobrada: bool.isRequired,
};

function mapStateToProps(state) {
    return {
        estudios: state.cobrarPresentacionReducer.estudios,
        estudiosApiLoading: state.cobrarPresentacionReducer.estudiosApiLoading,
        cobrada: state.cobrarPresentacionReducer.cobrada,
    };
}

export default connect(mapStateToProps)(CobrarPresentacionPage);
