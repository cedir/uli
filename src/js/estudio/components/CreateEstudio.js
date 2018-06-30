import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap/dist/react-bootstrap';
import EstudioDetailMain from './EstudioDetailMain';
import { RESET_ESTUDIO_DETAIL } from '../actionTypes';

class CreateEstudio extends Component {
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
                        <EstudioDetailMain estudioDetailFormMode='create' />
                    </Col>
                </Row>
            </div>
        );
    }
}

const { object, func } = React.PropTypes;

CreateEstudio.propTypes = {
    history: object.isRequired,
    estudioDetail: object,
    resetEstudioDetail: func.isRequired,
};

function mapStateToProps(state) {
    return {
        estudioDetail: state.estudiosReducer.estudioDetail,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        resetEstudioDetail: () => dispatch({ type: RESET_ESTUDIO_DETAIL }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEstudio);
