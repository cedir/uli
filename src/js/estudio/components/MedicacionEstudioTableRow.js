import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';

class MedicacionEstudioTableRow extends React.Component {
    constructor(props) {
        super(props);

        this.onRowClick = this.onRowClick.bind(this);
    }

    onRowClick() {
        this.props.onRowClick(this.props.medicacion);
    }

    render() {
        const medicacion = this.props.medicacion;
        const descripcion = medicacion.medicamento.descripcion;
        const importe = medicacion.importe || medicacion.medicamento.importe;

        return (
            <tr>
                <td>{ descripcion }</td>
                <td>{ importe }</td>
                <td style={ { paddingTop: '2px' } }>
                    <Button
                      bsStyle='link'
                      onClick={ this.onRowClick }
                    >
                        <Glyphicon glyph='remove' />
                    </Button>
                </td>
            </tr>
        );
    }
}

const { object, func } = PropTypes;

MedicacionEstudioTableRow.propTypes = {
    medicacion: object.isRequired,
    onRowClick: func.isRequired,
};

export default MedicacionEstudioTableRow;
