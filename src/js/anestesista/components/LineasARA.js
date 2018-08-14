import React from 'react';
import PropTypes from 'prop-types';
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
                        <li><span>Subtotal:</span>  ${ this.props.totales.subtotal }</li>
                        <li><span>Iva 21%:</span>  ${ this.props.totales.iva }</li>
                        <li><span>Total:</span>  ${ this.props.totales.total }</li>
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
        subtotal: 0,
        iva: 0,
        total: 0,
    },
};

const { array, object } = PropTypes;

LineasARAPres.propTypes = {
    lineas: array,
    anestesista: object,
    totales: object,
};

function mapStateToProps(state) {
    return {
        anestesista: state.pago_anestesista.anestesista,
        lineas: state.pago_anestesista.lineasAra,
        totales: state.pago_anestesista.totalesAra,
    };
}

function mapDispatchToProps() {
    return {};
}

export const LineasARA = connect(mapStateToProps, mapDispatchToProps)(LineasARAPres);

