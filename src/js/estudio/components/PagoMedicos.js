import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector,
    change, getFormValues, isValid } from 'redux-form';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { reduce } from 'lodash';

import ConditionalComponents from '../../utilities/ConditionalComponent';
import AsyncTypeaheadRF from '../../utilities/AsyncTypeaheadRF';
import PagoMedicosTable from './PagoMedicosTable';
import { FETCH_ESTUDIOS_IMPAGOS, SEND_PAGO_MEDICO } from '../actionTypes';
import { FETCH_MEDICOS } from '../../medico/actionTypes';

class PagoMedicos extends Component {
    constructor(props) {
        super(props);

        this.setSelectedMedico = this.setSelectedMedico.bind(this);
        this.isMedicoSelectedWithUnpaidEstudios =
            this.isMedicoSelectedWithUnpaidEstudios.bind(this);
        this.fetchMedicos = this.fetchMedicos.bind(this);
        this.fetchEstudiosImpagosMedico = this.fetchEstudiosImpagosMedico.bind(this);
        this.initPagoMedico = this.initPagoMedico.bind(this);
        this.handleCancelPago = this.handleCancelPago.bind(this);
        this.handlePago = this.handlePago.bind(this);
        this.state = {
            showConfirmPago: false,
        };
    }

    setSelectedMedico(selection) {
        if (selection[0] && selection[0].id) {
            this.props.setSelectedMedico(selection[0]);
        }
    }

    isMedicoSelectedWithUnpaidEstudios() {
        return this.props.selectedMedico.length > 0
            && this.props.estudiosImpagos.length > 0;
    }

    handlePago() {
        // hide pago confirmation modal
        this.setState({ showConfirmPago: false });
        // get all importes from pago form
        const importesEstudiosPagoMedico = this.props.editImportesPagoMedicosState;
        // get the id of each estudio to be paid from the key of the obejct containing all importes
        const keysEstudiosImpagos = Object.keys(importesEstudiosPagoMedico);
        const importes = keysEstudiosImpagos
            .map(key => ({
                estudio_id: key.split('-')[1],
                importe: importesEstudiosPagoMedico[key] }));
        const pago = {
            medico_id: this.props.selectedMedico[0].id,
            importes,
        };
        this.props.sendPagoMedico(pago);
    }

    initPagoMedico() {
        this.setState({ showConfirmPago: true });
    }

    handleCancelPago() {
        this.setState({ showConfirmPago: false });
    }

    fetchMedicos(searchText) {
        this.props.fetchMedicos({ searchText });
    }

    fetchEstudiosImpagosMedico(searchParams) {
        this.props.fetchEstudiosImpagosMedico(searchParams);
    }

    medicosTypeaheadRenderFunc(option) {
        if (!option.nombre || !option.apellido) {
            return '';
        }

        const matricula = option.matricula || '-';

        return `${option.apellido}, ${option.nombre}, Mat: ${matricula}`;
    }

    renderMedicoMenuItem(option) {
        const matricula = option.matricula || '-';
        return (
            <div style={ { width: '100%' } } key={ option.id }>
                { `${option.apellido}, ${option.nombre}` }
                <div>Matricula: { matricula }</div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h2>Pago a medicos</h2>
                <form onSubmit={ this.props.handleSubmit(this.fetchEstudiosImpagosMedico) }>
                    <Row>
                        <Col md={ 4 }>
                            <div>
                                <Field
                                  name='medicoActuante'
                                  label='Nombre o matricula'
                                  align='left'
                                  component={ AsyncTypeaheadRF }
                                  options={ this.props.medicos }
                                  labelKey={ this.medicosTypeaheadRenderFunc }
                                  onSearch={ this.fetchMedicos }
                                  onChange={ this.setSelectedMedico }
                                  selected={ this.props.selectedMedico }
                                  renderMenuItemChildren={ this.renderMedicoMenuItem }
                                  isLoading={ this.props.medicoApiLoading }
                                />
                            </div>
                            <div>
                                <Button type='submit'>
                                    Buscar estudios impagos
                                </Button>
                            </div>
                        </Col>
                        { this.isMedicoSelectedWithUnpaidEstudios()
                        && <Col md={ 8 }>
                            <div>
                                <h3>Importe: { this.props.totalImporteToPay }</h3>
                            </div>
                            <div>
                                <Button
                                  onClick={ this.initPagoMedico }
                                  disabled={ !this.props.isEditImportesPagosMedicosValid }
                                  bsStyle='primary'
                                >
                                    Pagar estudios
                                </Button>
                            </div>
                        </Col>
                        }
                    </Row>
                </form>
                <ConditionalComponents
                  component={ PagoMedicosTable }
                  display={ this.isMedicoSelectedWithUnpaidEstudios() }
                />
                <Modal show={ this.state.showConfirmPago }>
                    <Modal.Header>
                        Confirmar Pago
                    </Modal.Header>
                    <Modal.Body>
                        Esta a punto de registrar el pago de ${this.props.totalImporteToPay} a
                        { this.props.selectedMedico[0] &&
                        ` ${this.props.selectedMedico[0].nombre} ${this.props.selectedMedico[0].apellido}` }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={ this.handleCancelPago }>Cancelar</Button>
                        <Button onClick={ this.handlePago }>Aceptar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const { func, array, bool, object, number } = PropTypes;

PagoMedicos.propTypes = {
    handleSubmit: func.isRequired,
    medicos: array.isRequired,
    medicoApiLoading: bool.isRequired,
    selectedMedico: array.isRequired,
    setSelectedMedico: func.isRequired,
    estudiosImpagos: array.isRequired,
    fetchMedicos: func.isRequired,
    fetchEstudiosImpagosMedico: func.isRequired,
    editImportesPagoMedicosState: object,
    totalImporteToPay: number.isRequired,
    isEditImportesPagosMedicosValid: bool,
    sendPagoMedico: func.isRequired,
};

PagoMedicos.defaultProps = {
    totalImporteToPay: 0,
};

const PagoMedicosReduxForm = reduxForm({
    form: 'searchEstudiosImpagosMedico',
    destroyOnUnmount: false,
})(PagoMedicos);

const searchEstudiosImpagosMedicoSelector = formValueSelector('searchEstudiosImpagosMedico');
const getEditImportesPagoMedicos = getFormValues('editImportesPagoMedicos');
const isEditImportesPagosMedicosValidSelector = isValid('editImportesPagoMedicos');

function mapStateToProps(state) {
    let medico = searchEstudiosImpagosMedicoSelector(state, 'medicoActuante');
    medico = (medico && Array.isArray(medico))
        ? medico
        : [];
    const editImportesPagoMedicosState = getEditImportesPagoMedicos(state) || {};
    const totalImporteToPay =
        reduce(editImportesPagoMedicosState,
            (currentImporte, accImporte) => accImporte + currentImporte,
            0);

    return {
        medicos: state.medicoReducer.medicos,
        selectedMedico: medico,
        medicoApiLoading: state.medicoReducer.medicoApiLoading,
        estudiosImpagos: state.estudiosReducer.estudiosImpagos,
        editImportesPagoMedicosState,
        totalImporteToPay,
        isEditImportesPagosMedicosValid: isEditImportesPagosMedicosValidSelector(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMedicos: searchParam => dispatch({ type: FETCH_MEDICOS, searchParam }),
        fetchEstudiosImpagosMedico: fetchEstudiosParams =>
            dispatch({ type: FETCH_ESTUDIOS_IMPAGOS, fetchEstudiosParams }),
        setSelectedMedico: medico =>
            dispatch(change('searchEstudiosImpagosMedico', 'medicoActuante', medico)),
        sendPagoMedico: pago => dispatch({ type: SEND_PAGO_MEDICO, pago }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PagoMedicosReduxForm);
