import React from 'react';
import { Pagination, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UPDATE_PAGE_NUMBER } from '../actionTypes';

function CajaPaginacion({ pageNumber, cantPages, updatePageNumber }) {
    return (
        <Row>
            <Col md={ 12 }>
                <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  items={ cantPages }
                  maxButtons={ 5 }
                  activePage={ pageNumber }
                  onSelect={ updatePageNumber }
                />
            </Col>
        </Row>
    );
}

const { func, number } = PropTypes;

CajaPaginacion.propTypes = {
    pageNumber: number.isRequired,
    cantPages: number.isRequired,
    updatePageNumber: func.isRequired,
};


function mapStateToProps(state) {
    return {
        pageNumber: state.cajaReducer.pageNumber,
        cantPages: state.cajaReducer.cantPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updatePageNumber: pageNumber =>
            dispatch({ type: UPDATE_PAGE_NUMBER, pageNumber }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CajaPaginacion);
