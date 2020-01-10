import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getPresentacionFormatoOsde, getPresentacionFormatoAMR } from '../api';

class PresentacionesObraSocialTableRow extends Component {
    constructor(props) {
        super(props);

        this.downloadPresentacionDigitalOsde =
            this.downloadPresentacionDigitalOsde.bind(this);

        this.downloadPresentacionDigitalAmr =
            this.downloadPresentacionDigitalAmr.bind(this);
    }

    downloadPresentacionDigitalOsde() {
        getPresentacionFormatoOsde(this.props.presentacion);
    }

    downloadPresentacionDigitalAmr() {
        getPresentacionFormatoAMR(this.props.presentacion);
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
                      onClick={ this.downloadPresentacionDigitalOsde }
                    >
                        Osde
                    </a>
                    <span>&nbsp;|&nbsp;</span>
                    <a
                      href='#'
                      onClick={ this.downloadPresentacionDigitalAmr }
                    >
                        AMR
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
