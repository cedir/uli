import React from 'react';
import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function CajaPaginacion({ pageNumber, cantPages, updatePageNumber }) {
    return (
        <div style={ { textAlign: 'center' } }>
            <Pagination
              prev
              next
              ellipsis
              first
              last
              boundaryLinks
              items={ cantPages }
              maxButtons={ 5 }
              activePage={ pageNumber }
              onSelect={ updatePageNumber }
              style={ { textAlign: 'center' } }
            />
        </div>
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
        cantPages: state.cajaReducer.cantPages,
    };
}

export default connect(mapStateToProps)(CajaPaginacion);
