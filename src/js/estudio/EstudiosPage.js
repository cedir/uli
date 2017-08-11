import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as types from './actionTypes';
import { EstudiosDelDia } from './components/EstudiosDelDia';


class EstudiosPagePre extends React.Component {
    constructor(props) {
        super(props);
        this.fetchDesde = this.fetchDesde.bind(this);
        this.fetchHasta = this.fetchHasta.bind(this);
        this.state = {
            fechaDesde: moment().format('YYYY-MM-DD'),
            fechaHasta: moment().format('YYYY-MM-DD'),
        };
    }

    fetchDesde(event) {
        this.setState({ fechaDesde: event.target.value }, () => (
            this.props.fetch && this.props.fetch(this.state)
        ));
    }

    fetchHasta(event) {
        this.setState({ fechaHasta: event.target.value }, () => (
            this.props.fetch && this.props.fetch(this.state)
        ));
    }

    render() {
        return (
            <div>
                <h1>Estudios</h1>
                <p>Estudios del día</p>
                <input
                  type='date'
                  value={ this.state.fechaDesde }
                  onChange={ this.fetchDesde }
                />
                <input
                  type='date'
                  value={ this.state.fechaHasta }
                  onChange={ this.fetchHasta }
                />
                <EstudiosDelDia />
            </div>
        );
    }
}


EstudiosPagePre.propTypes = {
    fetch: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
    return {
        fetch: fecha => dispatch({ type: types.FETCH_ESTUDIOS_DIARIOS, fecha }),
        cancel: () => dispatch({ type: types.CANCEL_ESTUDIOS_DIARIOS }),
    };
}

export default connect(null, mapDispatchToProps)(EstudiosPagePre);

