import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import CabeceraFormView from './CabeceraFormView';
import { tiposComprobante, opcionesIva } from '../../../../utilities/generalUtilities';

function CabeceraForm({
    lockComprobante,
    updateForm,
    iva,
    tipoComprobante,
    viewMode,
}) {
    const opcionesResponsable = ['Cedir', 'Brunetti'];
    const subTiposComprobante = ['A', 'B'];

    useEffect(() => {
        if (!viewMode && lockComprobante) {
            // Este es el caso en que se creo un comprobante. Se hace esto para evitar
            // que aparezcan numeros en vez de los textos cuando bloqueamos el comprobante
            updateForm('iva', opcionesIva.find(e => e.gravado === iva).text);
            updateForm('tipoComprobante', tiposComprobante.find(e => e.value === tipoComprobante).text);
        }
    }, [lockComprobante]);

    useEffect(() => {
        if (!lockComprobante) {
            const opcionIva = opcionesIva.find(e => e.gravado === iva);
            updateForm('porcentaje', opcionIva ? opcionIva.porcentaje : 0);
        }
    }, [iva]);

    return (
        <CabeceraFormView
          tiposComprobante={ tiposComprobante }
          opcionesResponsable={ opcionesResponsable }
          subTiposComprobante={ subTiposComprobante }
          lockComprobante={ lockComprobante }
          opcionesIva={ opcionesIva }
        />
    );
}

const { bool, func, number } = PropTypes;

CabeceraForm.propTypes = {
    lockComprobante: bool.isRequired,
    updateForm: func.isRequired,
    iva: number.isRequired,
    tipoComprobante: number.isRequired,
    viewMode: bool.isRequired,
};

const selector = formValueSelector('CreateComprobanteForm');

function mapStateToProps(state) {
    return {
        iva: Number(selector(state, 'iva')),
        tipoComprobante: Number(selector(state, 'tipoComprobante')),
    };
}

export default connect(mapStateToProps)(CabeceraForm);
