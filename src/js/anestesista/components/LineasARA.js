import React from 'react';
import { connect } from 'react-redux';

class LineasARAPres extends React.Component {

    componentDidMount() {
        $('.footable').footable({ paginate: false, forceRefresh: true });
        $('.footable').trigger('footable_redraw');
    }

    componentDidUpdate() {
        $('.footable').footable({ paginate: false, forceRefresh: true });
        $('.footable').trigger('footable_redraw');
    }

    estudios(estudios) {
        return estudios.map((g, i) => <span key={ i }>{g.practica.abreviatura} - </span>);
    }

    movimientosCaja(movimientos) {
        return movimientos.map((m, i) =>
            <li key={ i }>{m.fecha} - {m.concepto} - ${m.monto} - {m.tipo.descripcion}</li>);
    }

    render() {
        return (
            <div>
                <div>Porcentaje Anestesista: { this.props.anestesista.porcentaje_anestesista }</div>
                <br /><br />
                <h2>Lista ARA</h2>
                <table className='footable table table-stripped toggle-arrow-tiny'>
                    <thead>
                        <tr>
                            <th data-toggle='true'>Fecha</th>
                            <th>Paciente</th>
                            <th>Obra Social</th>
                            <th>Practicas</th>
                            <th>Edad</th>
                            <th>Subtotal</th>
                            <th>Retencion</th>
                            <th data-hide='all'>Formula</th>
                            <th data-hide='all'>Importe</th>
                            <th data-hide='all'>Movimientos Caja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lineas.map((e, i) => (
                                <tr key={ 2 * i }>
                                    <td>{e.fecha}</td>
                                    <td>{e.paciente.apellido}, {e.paciente.nombre}</td>
                                    <td>{e.obra_social.nombre}</td>
                                    <td>
                                        {this.estudios(e.estudios)}
                                    </td>
                                    <td>{e.paciente._edad}</td>
                                    <td>{e.sub_total}</td>
                                    <td>{e.retencion}</td>

                                    <td>{e.formula} = {e.formula_valorizada}</td>
                                    <td>${e.importe}</td>
                                    <td>
                                        <ul>
                                            {
                                                this.movimientosCaja(e.movimientos_caja)
                                            }
                                        </ul>
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
                        <li><span>Iva Exento:</span>  ${ this.props.totales.iva00 }</li>
                        <li><span>Iva 10.5%:</span>  ${ this.props.totales.iva105 }</li>
                        <li><span>Iva 21%:</span>  ${ this.props.totales.iva210 }</li>
                    </ul>
                </div>
                <div>
                    <h3>Honorarios</h3>
                    <ul>
                        <li><span>Iva Exento:</span>  ${ this.props.totalesHonorarios.iva00 }</li>
                        <li><span>Iva 10.5%:</span>  ${ this.props.totalesHonorarios.iva105 }</li>
                        <li><span>Iva 21%:</span>  ${ this.props.totalesHonorarios.iva210 }</li>
                    </ul>
                </div>
            </div>
        );
    }
}

LineasARAPres.defaultProps = {
    lineas: [],
    anestesista: {
        porcentajeAnestesista: '',
    },
    totales: {
        iva00: 0,
        iva105: 0,
        iva210: 0,
    },
    totalesHonorarios: {
        iva00: 0,
        iva105: 0,
        iva210: 0,
    },
};

LineasARAPres.propTypes = {
    lineas: React.PropTypes.array,
    anestesista: React.PropTypes.object,
    totales: React.PropTypes.object,
    totalesHonorarios: React.PropTypes.object,
};

function mapStateToProps(state) {
    return {
        anestesista: state.pago_anestesista.anestesista,
        lineas: state.pago_anestesista.lineasAra,
        totales: state.pago_anestesista.totalesAra,
        totalesHonorarios: state.pago_anestesista.totalesHonorariosAra,
    };
}

function mapDispatchToProps() {
    return {};
}

export const LineasARA = connect(mapStateToProps, mapDispatchToProps)(LineasARAPres);

