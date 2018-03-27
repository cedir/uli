import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Pagination }
    from 'react-bootstrap/dist/react-bootstrap';
import EstudiosListTable from './EstudiosListTable';
import { FETCH_ESTUDIOS_DIARIOS, FETCH_OBRAS_SOCIALES } from '../actionTypes';
import estudioReducerInitialState from '../estudioReducerInitialState';
import ConditionalComponents from '../../utilities/ConditionalComponent';

const { number, func, object } = React.PropTypes;

class EstudiosList extends React.Component {
    constructor(props) {
        super(props);

        this.searchEstudios = this.searchEstudios.bind(this);
    }

    searchEstudios(actualPage) {
        this.props.searchParams.actualPage = actualPage;
        this.props.fetchEstudios(this.props.searchParams);
    }

    render() {
        return (
            <div>
                <EstudiosListTable history={ this.props.history } />
                <div style={ { textAlign: 'center' } }>
                    <ConditionalComponents
                      display={ this.props.resultPages > 1 }
                      component={ Pagination }
                      prev
                      next
                      first
                      last
                      ellipsis
                      boundaryLinks
                      items={ this.props.resultPages }
                      maxButtons={ 5 }
                      activePage={ this.props.actualPage }
                      onSelect={ this.searchEstudios }
                    />
                </div>
            </div>
        );
    }
}

EstudiosList.propTypes = {
    history: object,
    searchParams: object,
    fetchEstudios: func,
    resultPages: number,
    actualPage: number,
};

const initialSerchParams = estudioReducerInitialState.searchParams;

EstudiosList.defaultProps = {
    searchParams: initialSerchParams,
    resultPages: 0,
    actualPage: 0,
};

const selector = formValueSelector('searchEstudios');

function mapStateToProps(state) {
    return {
        resultPages: state.estudiosReducer.resultPages,
        actualPage: state.estudiosReducer.actualPage,
        searchParams: selector(state, 'obraSocial', 'dniPaciente', 'nombrePaciente',
            'apellidoPaciente', 'medicoSolicitante', 'medicoActuante', 'fechaDesde', 'fechaHasta'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEstudios: fetchEstudiosParams =>
            dispatch({ type: FETCH_ESTUDIOS_DIARIOS, fetchEstudiosParams }),
        fetchObrasSociales: () => dispatch({ type: FETCH_OBRAS_SOCIALES }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EstudiosList);
