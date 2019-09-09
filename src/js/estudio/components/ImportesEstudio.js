import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap/dist/react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import InputRF from '../../utilities/InputRF';
import { ESTADOS } from '../constants';
import { ACTULIZA_IMPORTES_ESTUDIO } from '../actionTypes';


class ImportesEstudio extends React.Component {

    constructor(props) {
        super(props);
        this.actulizarImportes = this.actulizarImportes.bind(this);
    }

    actulizarImportes(params) {
        const importes = {
            estudio_id: this.props.estudioDetail.id,
            pension: params.pension,
            diferencia_paciente: params.diferencia_paciente,
            arancel_anestesia: params.arancel_anestesia,
            pago_contra_factura: params.pago_contra_factura,
        };
        this.props.actulizarImportes(importes);
    }

    render() {
        const { presentacion } = this.props.estudioDetail;
        const estadoPresentacion = presentacion ? presentacion.estado : undefined;
        const lockEstudioEdition =
            (estadoPresentacion && estadoPresentacion !== ESTADOS.ABIERTO) || false;
        return (
            <div>
                <form onSubmit={ this.props.handleSubmit(this.actulizarImportes) }>
                    <Field
                      name='pension'
                      type='number'
                      staticField={ lockEstudioEdition }
                      label='Pension'
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
                    <Field
                      name='pago_contra_factura'
                      type='number'
                      staticField={ lockEstudioEdition }
                      label='Importe Pago Contra Factura'
                      component={ InputRF }
                    />
                    <Button
                      type='submit'
                      bsStyle='primary'
                      style={ { marginRight: '12px' } }
                      disabled={ lockEstudioEdition }
                    >
                    Actualizar
                    </Button>
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
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActulizaImportesReduxForm));

