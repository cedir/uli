import React, { Component, PropTypes } from 'react';

import { getPresentacionFormatoOsde } from '../api';

class PresentacionesObraSocialTableRow extends Component {
    constructor(props) {
        super(props);

        this.downloadPresentacionDigitalFormat =
            this.downloadPresentacionDigitalFormat.bind(this);
    }

    downloadPresentacionDigitalFormat() {
        getPresentacionFormatoOsde(this.props.presentacion);
    }

    render() {
        const {
            fecha,
            estado,
            total_facturado: totalFacturado,
            obra_social: obraSocial,
            total } = this.props.presentacion;
        return (
            <tr>
                <td>{ fecha }</td>
                <td>{ estado }</td>
                <td>{ obraSocial.nombre }</td>
                <td>{ totalFacturado }</td>
                <td>{ total }</td>
                <td>
                    <a
                      href='#'
                      onClick={ this.downloadPresentacionDigitalFormat }
                    >
                        Descargar Formato Digital
                    </a>
                </td>
            </tr>
        );
    }
}

const { object } = PropTypes;

PresentacionesObraSocialTableRow.propTypes = {
    presentacion: object.isRequired,
};

export default PresentacionesObraSocialTableRow;
