import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap/dist/react-bootstrap';
import { isEmpty } from 'lodash';
import EstudioDetailMain from './EstudioDetailMain';

import { FETCH_ESTUDIO_DETAIL } from '../actionTypes';

class EstudioDetailPage extends React.Component {
    componentDidMount() {
        this.props.fetchEstudioDetail(this.props.match.params.id);
    }
    render() {
        return (
            <div>
                <h2>Detalles estudio</h2>
                { !isEmpty(this.props.estudioDetail) && <Row className='show-grid'>
                    <Col md={ 4 } style={ { border: 'none' } }>
                        <EstudioDetailMain />
                    </Col>
                    <Col md={ 4 } style={ { border: 'none' } }>
                        Facturacion
                    </Col>
                    <Col md={ 4 } style={ { border: 'none' } }>
                        Medicacion
                    </Col>
                </Row> }
            </div>
        );
    }
}

const { object, func } = React.PropTypes;

EstudioDetailPage.propTypes = {
    match: object.isRequired,
    fetchEstudioDetail: func.isRequired,
    estudioDetail: object.isRequired,
};

function mapStateToProps(state) {
    return {
        estudioDetail: state.estudiosReducer.estudioDetail,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEstudioDetail: estudioId =>
            dispatch({ type: FETCH_ESTUDIO_DETAIL, estudioId }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EstudioDetailPage);
