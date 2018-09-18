import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { isEmpty } from 'lodash';
import EstudiosActionBar from './EstudiosActionBar';
import SearchEstudiosModal from './SearchEstudiosModal';
import EstudiosList from './EstudiosList';
import ConditionalComponents from '../../utilities/ConditionalComponent';
import searchEstudiosFormInitialState from '../searchEstudiosFormInitialState';
import { FETCH_ESTUDIOS_DIARIOS } from '../actionTypes';

const { array, object, func, number } = PropTypes;

const estudiosListPanel = props => (
    <EstudiosList history={ props.history } />
);

estudiosListPanel.propTypes = {
    history: object,
};

const noSearchResults = () => (
    <div style={ { textAlign: 'center', marginTop: '10px' } }>
        Su busqueda no ha arrojado resultados
    </div>
);

class EstudiosDelDiaPres extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpened: false,
        };
        this.openSearchEstudiosModal = this.openSearchEstudiosModal.bind(this);
        this.closeSearchEstudiosModal = this.closeSearchEstudiosModal.bind(this);
    }

    componentDidMount() {
        const { fecha, dniPaciente } = queryString.parse(this.props.location.search);
        let searchParams;
        // this is the case when the user arrives to EstudiosDelDia searching for specific
        // estudios, providing parameters in the url query string.
        // So far, this is used just to made easy clonning estudios
        if (fecha && dniPaciente) {
            searchParams = {
                fechaDesde: fecha,
                fechaHasta: fecha,
                dniPaciente,
            };

            this.props.fetchEstudios(searchParams);
        } else {
            // this is the normal app flow, returning to EstudioDelDia,
            // checking if a filter were already applyied
            // and applying the same filers again.
            searchParams = this.props.searchParams;
            if (!isEmpty(searchParams)) {
                this.props.searchParams.actualPage = this.props.actualPage;
                this.props.fetchEstudios(searchParams);
            }
        }
    }

    openSearchEstudiosModal() {
        this.setState({ modalOpened: true });
    }

    closeSearchEstudiosModal() {
        this.setState({ modalOpened: false });
    }

    render() {
        return (
            <div className='ibox-content'>
                <div className='pull-right'>
                    <EstudiosActionBar
                      openSearchEstudiosModal={ this.openSearchEstudiosModal }
                      history={ this.props.history }
                    />
                </div>
                <div className='clearfix' />
                <ConditionalComponents
                  component={ estudiosListPanel }
                  history={ this.props.history }
                  display={ this.props.estudios.length > 0 }
                />
                <ConditionalComponents
                  component={ noSearchResults }
                  display={ this.props.estudios.length === 0 }
                />
                <SearchEstudiosModal
                  modalOpened={ this.state.modalOpened }
                  closeModal={ this.closeSearchEstudiosModal }
                />
            </div>
        );
    }
}

EstudiosDelDiaPres.defaultProps = {
    estudios: [],
};

EstudiosDelDiaPres.propTypes = {
    estudios: array,
    actualPage: number,
    searchParams: object,
    fetchEstudios: func,
    history: object.isRequired,
    location: object.isRequired,
};

const selector = formValueSelector('searchEstudios');

function mapStateToProps(state) {
    let searchParams = selector(state, 'obraSocial', 'dniPaciente', 'nombrePaciente',
        'apellidoPaciente', 'medicoSolicitante', 'medicoActuante', 'fechaDesde', 'fechaHasta');

    if (isEmpty(searchParams)) {
        searchParams = searchEstudiosFormInitialState;
    }
    return {
        estudios: state.estudiosReducer.estudios,
        searchParams,
        actualPage: state.estudiosReducer.actualPage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEstudios: fetchEstudiosParams =>
            dispatch({ type: FETCH_ESTUDIOS_DIARIOS, fetchEstudiosParams }),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EstudiosDelDiaPres));
