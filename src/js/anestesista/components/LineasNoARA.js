import React from 'react';
import { connect } from 'react-redux';

/* const headers = [{
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
}]; */

class LineasNoARAPres extends React.Component {

    componentDidMount() {
        // debugger;
        $('.footable').footable({ paginate: false, forceRefresh: true });
        $('.footable').trigger('footable_redraw');
    }

    componentDidUpdate() {
        $('.footable').footable({ paginate: false, forceRefresh: true });
        $('.footable').trigger('footable_redraw');
    }

    estudios(estudios) {
        return estudios.map((g, i) =>
            <span key={ i }>{g.practica.abreviatura} - </span>);
    }

    movimientosCaja(movimientos) {
        return movimientos.map((m, i) =>
            <li key={ i }>{m.fecha} - {m.concepto} - ${m.monto} - {m.tipo.descripcion}</li>);
    }

    comprobante(comprobante) {
        const { sub_tipo: subTipo, numero } = comprobante;
        const { descripcion, porcentaje } = comprobante.gravado;
        return (
            <span> {subTipo} {numero} - {descripcion} %{porcentaje}</span>
        );
    }
/*
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
*/
    render() {
        const elems = this.props.lineas || [];
        return (
            <div>
                <br /><br />
                <h2>Lista NO ARA</h2>
                <table className='footable table table-stripped toggle-arrow-tiny'>
                    <thead>
                        {
                            /*
                            headers.map((e,i) => {
                                return (
                                <th key={i} onClick={this.sortColumn(i)}>
                                    <span className={this.sortSymbol(i)}/>
                                    <a>{e.Descripcion}</a>
                                </th>
                                );
                            }) */
                        }
                        <tr>
                            <th data-toggle='true'>Fecha</th>
                            <th>Paciente</th>
                            <th>Obra Social</th>
                            <th>Practicas</th>
                            <th>Edad</th>
                            <th>Subtotal</th>
                            <th>A pagar</th>

                            <th data-hide='all'>Formula</th>
                            <th data-hide='all'>Importe</th>
                            <th data-hide='all'>IVA</th>
                            <th data-hide='all'>Movimientos Caja</th>
                            <th data-hide='all'>Comprobante</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            elems.map((e, i) => (
                                <tr key={ 2 * i }>
                                    <td>{e.fecha}</td>
                                    <td>{e.paciente.apellido}, {e.paciente.nombre}</td>
                                    <td>{e.obra_social.nombre}</td>
                                    <td>
                                        { this.estudios(e.estudios)}
                                    </td>
                                    <td>{e.paciente._edad}</td>
                                    <td>{e.sub_total}</td>
                                    <td>{e.retencion}</td>

                                    <td>{e.formula} = {e.formula_valorizada}</td>
                                    <td>${e.importe}</td>
                                    <td>%{e.alicuota_iva}</td>
                                    <td>
                                        <ul>
                                            {this.movimientosCaja(e.movimientos_caja)}
                                        </ul>
                                    </td>
                                    <td>
                                        {
                                            e.comprobante ?
                                                this.comprobante(e.comprobante) : ''
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan='4'>
                                <ul className='pagination pull-right' />
                            </td>
                        </tr>
                    </tfoot>
                </table>

                <div>
                    <h3>Totales</h3>
                    <ul>
                        <li><span>Iva Exento:</span>  ${ this.props.subtotales.iva00 }
                            &nbsp;&nbsp;<span>Iva: </span> ${ this.props.totalesIva.iva00 }
                            &nbsp;&nbsp;<span>Total:</span> ${ this.props.totales.iva00 }
                        </li>
                        <li><span>Iva 10.5%:</span>  ${ this.props.subtotales.iva105 }
                            &nbsp;&nbsp;<span>Iva: </span> ${ this.props.totalesIva.iva105 }
                            &nbsp;&nbsp;<span>Total:</span> ${ this.props.totales.iva105 }
                        </li>
                        <li><span>Iva 21%:</span>  ${ this.props.subtotales.iva210 }
                            &nbsp;&nbsp;<span>Iva: </span> ${ this.props.totalesIva.iva210 }
                            &nbsp;&nbsp;<span>Total:</span> ${ this.props.totales.iva210 }
                        </li>
                    </ul>
                </div>
                <br /><br />
            </div>
        );
    }
}

LineasNoARAPres.defaultProps = {
    lineas: [],
    subtotales: {
        iva00: 0,
        iva105: 0,
        iva210: 0,
    },
    totalesIva: {
        iva00: 0,
        iva105: 0,
        iva210: 0,
    },
    totales: {
        iva00: 0,
        iva105: 0,
        iva210: 0,
    },
};

LineasNoARAPres.propTypes = {
    lineas: React.PropTypes.array,
    subtotales: React.PropTypes.object,
    totalesIva: React.PropTypes.object,
    totales: React.PropTypes.object,
};

function mapStateToProps(state) {
    return {
        lineas: state.pago_anestesista.lineasNoAra,
        subtotales: state.pago_anestesista.subtotalesNoAra,
        totalesIva: state.pago_anestesista.totalesIvaNoAra,
        totales: state.pago_anestesista.totalesNoAra,
    };
}

function mapDispatchToProps() {
    return {};
}

export const LineasNoARA = connect(mapStateToProps, mapDispatchToProps)(LineasNoARAPres);

