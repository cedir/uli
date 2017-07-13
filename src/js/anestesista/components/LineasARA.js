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
                            <th>Obra Social</th>
                            <th>Practicas</th>
                            <th>Edad</th>
                            <th>Subtotal</th>
                            <th>Retencion</th>

                            <th data-hide="all">Formula</th>
                            <th data-hide="all">Importe</th>
                            <th data-hide="all">Descuento</th>
                            <th data-hide="all">Movimientos Caja</th>
                            <th data-hide="all">Comprobante</th>
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
                                    <td>{e.obra_social.nombre}</td>
                                    <td>
                                        {
                                            e.estudios.map((g,iii) => <span key={iii}>{g.practica.abreviatura} - </span>)
                                        }
                                    </td>
                                    <td>{e.paciente._edad}</td>
                                    <td>{e.sub_total}</td>
                                    <td>{e.retencion}</td>

                                    <td>{e.formula} = {e.formula_valorizada}</td>
                                    <td>${e.importe}</td>
                                    <td>Esto no deberia ir arriba? (ya que es lo mismo para todos los registros)</td>
                                    <td>
                                        <ul>
                                            {
                                                e.movimientos_caja.map((m,ii) => <li key={ii}>{m.fecha} - {m.concepto} - ${m.monto} - {m.tipo.descripcion}</li>)
                                            }
                                        </ul>
                                    </td>
                                    <td>Esto se puede sacar? No se necesita el comprobante para ARA</td>
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
