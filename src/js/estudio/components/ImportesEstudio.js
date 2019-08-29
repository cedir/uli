import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class ImportesEstudio extends React.Component {

    render() {
        return (
            <div>
                {this.props.estudioDetail.fecha}
            </div>
        );
    }
}

const { object } = PropTypes;

ImportesEstudio.propTypes = {
    estudioDetail: object.isRequired,
};

function mapStateToProps(state) {
    return {
        estudioDetail: state.estudiosReducer.estudioDetail,
    };
}

function mapDispatchToProps() {
    return {
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImportesEstudio));
