import React from 'react';

const { object, func } = React.PropTypes;

class EstudioListTableRow extends React.Component {
    constructor(props) {
        super(props);

        this.onRowClick = this.onRowClick.bind(this);
    }
    onRowClick() {
        const estudioId = this.props.estudio.id;
        this.props.onRowClick(estudioId);
    }
    render() {
        return (
            <tr onClick={ this.onRowClick }>
                <td>{ this.props.estudio.fecha }</td>
                <td>{ `${this.props.estudio.paciente.apellido}, ${this.props.estudio.paciente.nombre}` }</td>
                <td>{ this.props.estudio.obra_social.nombre }</td>
                <td>{ this.props.estudio.practica.descripcion }</td>
                <td>{ `${this.props.estudio.medico.apellido}, ${this.props.estudio.medico.nombre}` }</td>
                <td>{ `${this.props.estudio.medico_solicitante.apellido}, ${this.props.estudio.medico_solicitante.nombre}` }</td>
            </tr>
        );
    }
}

EstudioListTableRow.propTypes = {
    estudio: object.isRequired,
    onRowClick: func.isRequired,
};

export default EstudioListTableRow;
