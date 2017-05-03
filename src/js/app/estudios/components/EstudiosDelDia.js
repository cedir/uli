import React from 'react';
import { Link } from 'react-router';
import { Tabla } from '../../common/components/Tabla';
import { connect } from 'react-redux';

const headers = [{
    Descripcion: 'Fecha',
    SortField: 'fecha',
    Format(e){
        return e.fecha;
    }        
}, {
    Descripcion: 'Paciente',
    SortField: 'paciente.apellido',
    Format(e){
        return `${e.paciente.apellido}, ${e.paciente.nombre}`;
    }        
}, {
    Descripcion: 'Obra Social',
    SortField: 'obra_social.nombre',
    Format(e){
        return e.obra_social.nombre;
    }        
},{
    Descripcion: 'Práctica',
    SortField: 'practica.descripcion',
    Format(e){
        return e.practica.abreviatura || e.practica.descripcion;
    }        
},{
    Descripcion: 'Médico',
    SortField: 'medico.apellido',
    Format(e){
        return `${e.medico.apellido}, ${e.medico.nombre}`;
    }        
}];

class EstudiosDelDiaPres extends React.Component {
    render() {
        return (
            <Tabla headers={headers} rows={this.props.estudios} fetch={this.props.fetch} cancel={this.props.cancel}/>
        );
    }
}

EstudiosDelDiaPres.propTypes = {
    estudios: React.PropTypes.array,
    fetch: React.PropTypes.func,
    cancel: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    estudios: state.estudios
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: () => dispatch({type: 'FETCH_ESTUDIOS_DIARIOS'}),
    cancel: () => dispatch({type: 'CANCEL_ESTUDIOS_DIARIOS'})
  };
}

export const EstudiosDelDia = connect(mapStateToProps, mapDispatchToProps)(EstudiosDelDiaPres);