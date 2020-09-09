import React from 'react';
import PropTypes, { bool } from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap/dist/react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import InputRF from '../../utilities/InputRF';
import { ESTADOS } from '../constants';
import { ACTULIZA_IMPORTES_ESTUDIO, REALIZAR_PAGO_CONTRA_FACTURA, ANULAR_PAGO_CONTRA_FACTURA } from '../actionTypes';


class ImportesEstudio extends React.Component {

    constructor(props) {
        super(props);
        this.actulizarImportes = this.actulizarImportes.bind(this);
        this.realizarPago = this.realizarPago.bind(this);
        this.anularPago = this.anularPago.bind(this);
    }

    actulizarImportes(params) {
        const importes = {
            estudio_id: this.props.estudioDetail.id,
            pension: params.pension,
            diferencia_paciente: params.diferencia_paciente,
            arancel_anestesia: params.arancel_anestesia,
        };
        this.props.actulizarImportes(importes);
    }

    realizarPago(params) {
        const datos = {
            estudio_id: this.props.estudioDetail.id,
            pago_contra_factura: params.pago_contra_factura,
            setPagoContraFactura: this.props.setPagoContraFactura,
        };
        this.props.realizarPago(datos);
    }

    anularPago() {
        const datos = {
            estudio_id: this.props.estudioDetail.id,
            setPagoContraFactura: this.props.setPagoContraFactura,
        };
        this.props.anularPago(datos);
    }

    render() {
        const { presentacion } = this.props.estudioDetail;
        const esPagoContraFactura = this.props.esPagoContraFactura;
        const estadoPresentacion = presentacion ? presentacion.estado : undefined;
        const lockEstudioEdition =
            (estadoPresentacion && estadoPresentacion !== ESTADOS.ABIERTO) || false;
        const valorAproximadoPension = this.props.estudioDetail ?
            this.props.estudioDetail.obra_social.valor_aproximado_pension : 0;
        return (
            <div>
                <form>
                    <div>
                        <Field
                          name='pension'
                          type='number'
                          staticField={ lockEstudioEdition }
                          label='Pension'
                          helpText={ `Valor aproximado: ${valorAproximadoPension}` }
                          component={ InputRF }
                        />
                        <Field
                          name='diferencia_paciente'
                          type='number'
                          staticField={ lockEstudioEdition }
                          label='Diferencia Paciente'
                          component={ InputRF }
                        />
                        <Field
                          name='arancel_anestesia'
                          type='number'
                          staticField={ lockEstudioEdition }
                          label='Arancel Anestesia'
                          component={ InputRF }
                        />
                        <Button
                          type='submit'
                          bsStyle='primary'
                          style={ { marginRight: '12px' } }
                          disabled={ lockEstudioEdition }
                          onClick={ this.props.handleSubmit(this.actulizarImportes) }
                        >
                        Actualizar
                        </Button>
                    </div>
                    <br />
                    <div>
                        <Field
                          name='pago_contra_factura'
                          type='number'
                          staticField={ lockEstudioEdition }
                          label='Importe Pago Contra Factura'
                          component={ InputRF }
                        />
                        <Button
                          type='button'
                          bsStyle='primary'
                          style={ { marginRight: '12px' } }
                          disabled={ lockEstudioEdition || esPagoContraFactura }
                          onClick={ this.props.handleSubmit(this.realizarPago) }
                        >
                        Realizar Pago
                        </Button>
                        <Button
                          type='button'
                          bsStyle='primary'
                          style={ { marginRight: '12px' } }
                          disabled={ lockEstudioEdition || !esPagoContraFactura }
                          onClick={ this.props.handleSubmit(this.anularPago) }
                        >
                        Anular Pago
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

const ActulizaImportesReduxForm = reduxForm({
    form: 'actulizaImportesForm',
})(ImportesEstudio);

const { func, object } = PropTypes;

ImportesEstudio.propTypes = {
    estudioDetail: object.isRequired,
    handleSubmit: func.isRequired,
    actulizarImportes: func.isRequired,
    realizarPago: func.isRequired,
    anularPago: func.isRequired,
    esPagoContraFactura: bool.isRequired,
    setPagoContraFactura: func.isRequired,
};

function mapStateToProps(state) {
    return {
        estudioDetail: state.estudiosReducer.estudioDetail,
        initialValues: state.estudiosReducer.estudioDetail,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actulizarImportes: importes =>
            dispatch({ type: ACTULIZA_IMPORTES_ESTUDIO, importes }),
        realizarPago: datos =>
            dispatch({ type: REALIZAR_PAGO_CONTRA_FACTURA, datos }),
        anularPago: datos =>
            dispatch({ type: ANULAR_PAGO_CONTRA_FACTURA, datos }),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActulizaImportesReduxForm));
