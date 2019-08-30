import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap/dist/react-bootstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';
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
            id: this.props.estudioDetail.id,
            importe: params.importe,
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
                      name='importe'
                      type='number'
                      staticField={ lockEstudioEdition }
                      label='Importe'
                      component={ InputRF }
                    />
                    <Button
                      type='submit'
                      bsStyle='primary'
                      style={ { marginRight: '12px' } }
                      disabled={ lockEstudioEdition }
                    >
                    Guardar Importes
                    </Button>
                </form>
            </div>
        );
    }
}

const ActulizaImportesReduxForm = reduxForm({
    form: 'actulizaImportesForm',
})(ImportesEstudio);
const formSelector = formValueSelector('actulizaImportesForm');
const { func, object } = PropTypes;

ImportesEstudio.propTypes = {
    estudioDetail: object.isRequired,
    handleSubmit: func.isRequired,
    actulizarImportes: func.isRequired,
    //cargarImportesDefault: func.isRequired,
};

ImportesEstudio.defaultProps = {
    importe: '',
};

function mapStateToProps(state) {
    return {
        estudioDetail: state.estudiosReducer.estudioDetail,
        importe: formSelector(state, 'importe'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actulizarImportes: estudio =>
            dispatch({ type: ACTULIZA_IMPORTES_ESTUDIO, estudio }),
    };
}

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImportesEstudio));
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActulizaImportesReduxForm));

