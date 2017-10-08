import React from 'react';
import { connect } from 'react-redux';
import { Pagination }
    from 'react-bootstrap/dist/react-bootstrap';
import EstudiosListTable from './EstudiosListTable';
import { FETCH_ESTUDIOS_DIARIOS, FETCH_OBRAS_SOCIALES } from '../actionTypes';
import initialState from '../estudioReducerInitialState';
import ConditionalComponents from '../../utilities/ConditionalComponent';

const initialProps = initialState.searchParams;

const { number, func, object } = React.PropTypes;

class EstudiosList extends React.Component {
    constructor(props) {
        super(props);

        this.searchEstudios = this.searchEstudios.bind(this);
    }
    searchEstudios(actualPage) {
        const fetchEstudiosParams = {
            searchParams: this.props.searchParams,
            actualPage,
        };

        this.props.fetchEstudios(fetchEstudiosParams);
    }
    render() {
        return (
            <div>
                <EstudiosListTable />
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
    searchParams: object,
    fetchEstudios: func,
    resultPages: number,
    actualPage: number,
};

EstudiosList.defaultProps = {
    searchParams: initialProps,
    resultPages: 0,
    actualPage: 0,
};

function mapStateToProps(state) {
    return {
        resultPages: state.estudiosReducer.resultPages,
        actualPage: state.estudiosReducer.actualPage,
        searchParams: state.form.searchEstudios.values,
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
