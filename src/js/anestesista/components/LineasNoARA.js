import React from 'react';
import { orderBy } from 'lodash';
import { connect } from 'react-redux';

const headers = [{
    Descripcion: 'Fecha',
    SortField: 'fecha',
    Format: (e) => e.fecha
},{
    Descripcion: 'Paciente',
    SortField: 'paciente.apellido',
    Format: (e) => `${e.paciente.apellido}, ${e.paciente.nombre} (${e.paciente.edad || 'N/D'})`
}, {
    Descripcion: 'Obra Social',
    SortField: 'obra_social.nombre',
    Format: (e) => e.obra_social.nombre
},{
    Descripcion: 'Fórmula',
    SortField: 'Formula',
    Format: (e) => e.formula
},{
    Descripcion: 'Importe',
    SortField: 'importe',
    Format: (e) => e.importe
}];

class LineasNoARAPres extends React.Component {
    constructor(props){
        super(props);

        this.sort = this.sort.bind(this);
        this.sortColumn = this.sortColumn.bind(this);
        this.sortSymbol = this.sortSymbol.bind(this);

        this.state = { 
            sort: {}
        };
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
                return orderBy(this.props.lineas, header.SortField, direction) || [];
            }
        }

        return this.props.lineas || [];
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
                        [<tr key={2*i}>
                            {
                                headers.map((f,ii) => <td key={ii}>{f.Format(e)}</td>)
                            }
                        </tr>,
                        <tr key={2*i+1}>
                            <td colSpan={headers.length}>
                                <ul>
                                    {
                                        e.estudios.map((g,iii) =>
                                            <li key={iii}>{g.practica.descripcion}</li>
                                            )
                                    }
                                </ul>
                            </td>
                        </tr>
                        ]
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

LineasNoARAPres.propTypes = {
    lineas: React.PropTypes.array
};

function mapStateToProps(state) {
  return {
    lineas: state.pago_anestesista.lineas_no_ARA
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export const LineasNoARA = connect(mapStateToProps, mapDispatchToProps)(LineasNoARAPres);
