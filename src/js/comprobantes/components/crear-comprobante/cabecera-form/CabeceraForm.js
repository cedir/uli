import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import CabeceraFormView from './CabeceraFormView';

function CabeceraForm({
    opcionesIva,
    lockComprobante,
    updateForm,
    iva,
    tipoComprobante,
    viewMode,
}) {
    const opcionesResponsable = ['Cedir', 'Brunetti'];
    const tiposComprobante = [
        { text: 'Factura', value: 1 },
        { text: 'Liquidacion', value: 2 },
        { text: 'Nota De Debito', value: 3 },
        { text: 'Nota De Credito', value: 4 },
        { text: 'Factura Electronica', value: 5 },
        { text: 'Nota de Debito Electronica', value: 6 },
        { text: 'Nota de Credito Electronica', value: 7 },
    ];
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

const { array, bool, func, number } = PropTypes;

CabeceraForm.propTypes = {
    opcionesIva: array.isRequired,
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
