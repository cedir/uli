import React from 'react';
import PropTypes from 'prop-types';
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
        const { searchParams } = this.props;
        if (!isEmpty(searchParams)) {
            this.props.searchParams.actualPage = this.props.actualPage;
            this.props.fetchEstudios(searchParams);
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

export default connect(mapStateToProps, mapDispatchToProps)(EstudiosDelDiaPres);
