import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap/dist/react-bootstrap';
import EstudioDetailMain from './EstudioDetailMain';
import { RESET_ESTUDIO_DETAIL, CLONE_ESTUDIO } from '../actionTypes';

class CreateEstudio extends Component {
    componentDidMount() {
        const { estudioId } = queryString.parse(this.props.location.search);
        // if estudioId is provided via query string, get it's details
        // to prefill the estudio creation form
        if (estudioId) {
            this.props.getEstudioToClone(estudioId);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { estudioDetail } = nextProps;

        if (estudioDetail.id) {
            this.props.history.push(`/estudios/detail/${estudioDetail.id}`);
        }
    }

    componentWillUnmount() {
        this.props.resetEstudioDetail();
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Crear nuevo estudio</h2>
                </div>
                <Row className='show-grid'>
                    <Col md={ 4 } style={ { border: 'none' } }>
                        <EstudioDetailMain
                          estudioDetailFormMode='create'
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

const { object, func } = PropTypes;

CreateEstudio.propTypes = {
    history: object.isRequired,
    estudioDetail: object,
    resetEstudioDetail: func.isRequired,
    getEstudioToClone: func.isRequired,
    location: object.isRequired,
};

function mapStateToProps(state) {
    return {
        estudioDetail: state.estudiosReducer.estudioDetail,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        resetEstudioDetail: () => dispatch({ type: RESET_ESTUDIO_DETAIL }),
        getEstudioToClone: estudioId =>
            dispatch({ type: CLONE_ESTUDIO, estudioId }),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateEstudio));
