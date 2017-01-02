import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class EstudiosDelDiaPres extends React.Component {
    componentDidMount() {
        this.props.fetch();
    }

    render() {
        return (
            <table className="footable table table-stripped toggle-arrow-tiny default breakpoint footable-loaded">
                <thead>
                    <tr>
                        <th data-toggle="true" className="footable-visible footable-first-column footable-sortable">
                            Fecha
                            <span className="footable-sort-indicator"/>
                        </th>
                        <th className="footable-visible footable-sortable">
                            Paciente
                            <span className="footable-sort-indicator"/>
                        </th>
                        <th className="footable-visible footable-sortable">
                            Obra Social
                            <span className="footable-sort-indicator"/>
                        </th>
                        <th className="footable-visible footable-sortable">
                            Práctica<span className="footable-sort-indicator"/>
                        </th>
                        <th className="footable-visible footable-sortable">
                            Médico
                            <span className="footable-sort-indicator"/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.estudios.map((e, i) =>
                        <tr key={i} id={i} className="footable-even" style={{display: 'table-row'}}>
                            <td className="footable-visible footable-first-column">
                                <span className="footable-toggle"/>
                                {e.fecha}
                            </td>
                            <td className="footable-visible">
                                {`${e.paciente.apellido}, ${e.paciente.nombre}`}
                            </td>
                            <td className="footable-visible">
                                {e.obra_social.nombre}
                            </td>
                            <td className="footable-visible">
                                {e.practica.abreviatura || e.practica.descripcion}
                            </td>
                            <td className="footable-visible">
                                {`${e.medico.apellido}, ${e.medico.nombre}`}
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan="5" className="footable-visible">
                        <ul className="pagination pull-right">
                            <li className="footable-page-arrow disabled">
                                <a data-page="first" href="#first">«</a>
                            </li>
                            <li className="footable-page-arrow disabled">
                                <a data-page="prev" href="#prev">‹</a>
                            </li>
                            <li className="footable-page active">
                                <a data-page="0" href="#">1</a>
                            </li>
                            <li className="footable-page">
                                <a data-page="1" href="#">2</a>
                            </li>
                            <li className="footable-page-arrow">
                                <a data-page="next" href="#next">›</a>
                            </li>
                            <li className="footable-page-arrow">
                                <a data-page="last" href="#last">»</a>
                            </li>
                        </ul>
                    </td>
                </tr>
                </tfoot>
            </table>
        );
    }
}

EstudiosDelDiaPres.PropTypes = {
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