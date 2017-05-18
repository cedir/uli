import React from 'react';
import { orderBy } from 'lodash';
import { connect } from 'react-redux';

/*const headers = [{
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
}];*/

class LineasARAPres extends React.Component {

    constructor(props){
        super(props);

        /*this.state = { 
            sort: {}
        };*/
    }

    componentDidMount() {
        //debugger;
        $('.footable').footable({ paginate:false, forceRefresh:true });
        $('.footable').trigger('footable_redraw');
    }

    componentDidUpdate() {
        $('.footable').footable({ paginate:false, forceRefresh:true });
        $('.footable').trigger('footable_redraw');
    }

    render() {
        const elems = this.props.lineas || [];
        return (
            <div>
                <table className="footable table table-stripped toggle-arrow-tiny">
                    <thead>
                        <tr>
                            <th data-toggle="true">Fecha</th>
                            <th>Paciente</th>
                            <th data-hide="all">Formula</th>
                            <th data-hide="all">Importe</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        /*  Esto es para mostrar dos <tr> por registro. En el segundo va el detalle
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
                                        e.estudios.map((g,iii) => <li key={iii}>{g.practica.descripcion}</li>)
                                    }
                                </ul>
                            </td>
                        </tr>
                        ]
                        )*/
                        elems.map((e, i) => {
                            return (
                                <tr key={2*i}>
                                    <td>{e.fecha}</td>
                                    <td>{e.paciente.apellido}, {e.paciente.nombre}</td>
                                    <td>{e.formula}</td>
                                    <td>{e.importe}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4">
                                <ul className="pagination pull-right" />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

LineasARAPres.propTypes = {
    lineas: React.PropTypes.array
};

function mapStateToProps(state) {
  return {
    lineas: state.pago_anestesista.lineas_ARA
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export const LineasARA = connect(mapStateToProps, mapDispatchToProps)(LineasARAPres);
