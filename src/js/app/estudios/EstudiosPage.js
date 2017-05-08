import React from 'react';
import {Link} from 'react-router';
import {EstudiosDelDia} from './components/EstudiosDelDia';
import { connect } from 'react-redux';
import moment from 'moment';


class EstudiosPagePre extends React.Component {
  constructor(props) {
    super(props);
    this.fetchDesde = this.fetchDesde.bind(this);
    this.fetchHasta = this.fetchHasta.bind(this);
    this.state = { 
      fechaDesde: moment().format('YYYY-MM-DD'),
      fechaHasta: moment().format('YYYY-MM-DD')
    };
  }

  fetchDesde(event){
    this.setState({ fechaDesde: event.target.value}, function(){
      this.props.fetch && this.props.fetch(this.state);
    });
  }

  fetchHasta(event){
    this.setState({ fechaHasta: event.target.value}, function(){
      this.props.fetch && this.props.fetch(this.state);
    });
  }

  render () {
    return (
        <div>
          <h1>Estudios</h1>
          <p>Estudios del día</p>
          <input type="date" value={this.state.fechaDesde} onChange={this.fetchDesde} />
          <input type="date" value={this.state.fechaHasta} onChange={this.fetchHasta} />
          <EstudiosDelDia/>
        </div>
      );
  }
}


EstudiosPagePre.propTypes = {
    estudios: React.PropTypes.array,
    fetch: React.PropTypes.func,
    cancel: React.PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return {
    fetch: (fecha) => dispatch({type: 'FETCH_ESTUDIOS_DIARIOS', fecha}),
    cancel: () => dispatch({type: 'CANCEL_ESTUDIOS_DIARIOS'})
  };
}

export default connect(null,mapDispatchToProps)(EstudiosPagePre);

