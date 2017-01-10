import React from 'react';
import { Link } from 'react-router';
import { Tabla } from '../base/Tabla';
import { connect } from 'react-redux';

const headers = [{
    Descripcion: 'Fecha',
    Sort: {
        Field: 'fecha',
        Order: 0
    },
    Format(e){
        return e.fecha;
    }        
}, {
    Descripcion: 'Paciente',
    Sort: {
        Field: 'paciente.apellido',
        Order: 0
    },
    Format(e){
        return `${e.paciente.apellido}, ${e.paciente.nombre}`;
    }        
}, {
    Descripcion: 'Obra Social',
    Sort: {
        Field: 'obra_social.nombre',
        Order: 0
    },
    Format(e){
        return e.obra_social.nombre;
    }        
},{
    Descripcion: 'Práctica',
    Sort: {
        Field: 'practica.descripcion',
        Order: 0
    },
    Format(e){
        return e.practica.abreviatura || e.practica.descripcion;
    }        
},{
    Descripcion: 'Médico',
    Sort: {
        Field: 'medico.apellido',
        Order: 0
    },
    Format(e){
        return `${e.medico.apellido}, ${e.medico.nombre}`;
    }        
}];

class EstudiosDelDiaPres extends React.Component {

    componentDidMount() {
        this.props.fetch();
    }

    render() {
        return (
            <Tabla headers={headers} rows={this.props.estudios}/>
        );
    }
}

EstudiosDelDiaPres.propTypes = {
    estudios: React.PropTypes.array,
    fetch: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    estudios: state.estudios
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: () => dispatch({type: 'FETCH_ESTUDIOS_DIARIOS'})
  };
}

export const EstudiosDelDia = connect(mapStateToProps, mapDispatchToProps)(EstudiosDelDiaPres);