import React from 'react';
import { orderBy } from 'lodash';
import { Link } from 'react-router';
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
    constructor(props){
        super(props);

        this.sort = this.sort.bind(this);
        this.sortColumn = this.sortColumn.bind(this);
        this.sortSymbol = this.sortSymbol.bind(this);

        this.state = { 
            sort: {}
        };
    }

    componentDidMount() {
        this.props.fetch && this.props.fetch();
    }

    sortColumn(i){
        const context = this;
        return function(ev){
            const viejo = context.state.sort;
            const nuevo = {};

            if(viejo && viejo.Index == i) {
                const proximo = (viejo.Direction + 1) % 3;
                if(proximo){
                    Object.assign(nuevo, viejo);
                    nuevo.Direction = proximo;
                }
            }
            else
            {
                Object.assign(nuevo, {Index: i, Direction: 1});
            }

            context.setState({
                sort: nuevo 
            });
        };
    }

    sortDescription(value){
        switch (value) {
            case 1:
                return 'asc';
            case 2:
                return 'desc';
            default:
                return '';
        }
    }

    sortSymbol(i){
        const actual = this.state.sort;
        const icon = !actual || actual.Index != i
            ? ""
            : actual.Direction == 1
                ? "sort-asc"
                : "sort-desc"
                ;

        return "pull-right fa fa-" + icon;
    }

    sort(){
        const sInfo = this.state.sort;
        if(sInfo) {
            const header = headers[sInfo.Index];
            if(header)
            {
                const direction = this.sortDescription(sInfo.Direction);
                return orderBy(this.props.estudios, header.SortField, direction) || [];
            }
        }

        return this.props.estudios || [];
    }

    render() {
        const elems = this.sort();
        return (
            <div>
                <table className="table table-stripped">
                    <thead>
                        <tr>
                        {
                            headers.map((e,i) => {
                                return (
                                <th key={i} onClick={this.sortColumn(i)}>
                                    <span className={this.sortSymbol(i)}/>
                                    <a>{e.Descripcion}</a>
                                </th>
                                );
                            })
                        }
                        </tr>
                    </thead>
                    <tbody>
                    {
                        elems.map((e, i) => 
                        <tr key={2*i}>
                            {
                                headers.map((f,ii) => <td key={ii}>{f.Format(e)}</td>)
                            }
                        </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
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