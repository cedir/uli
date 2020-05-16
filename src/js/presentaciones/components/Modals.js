import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import FinalizarGuardarForm from './FinalizarGuardarForm';
import Comprobante from './Comprobante';
import MedicacionEstudio from './MedicacionEstudio';
import AgregarEstudioList from './AgregarEstudioList';
import AlertModal from '../../utilities/components/alert/AlertModal';

export default function ModalAgregarEstudio(props) {
    /* eslint-disable no-unused-vars */
    const {
        show,
        onClickClose,
        agregarEstudiosTabla,
        estudios,
        estudiosAgregarApiLoading,
        estudiosAgregar,
    } = props;
    // TODO BUG
    const [selected, setSelected] = useState(new Map([]));
    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState(false);
    const [estudiosToAdd, setEstudiosToAdd] = useState([]);

    const handleClick = (event, id) => {
        const newSelected = new Map(selected);
        const value = newSelected.get(id);
        let isActive = true;
        if (value) {
            isActive = false;
        }
        newSelected.set(id, isActive);
        setSelected(newSelected);
    };

    const handleAgregarSelected = () => {
        const idsSelected = [];
        const idsInList = [];
        selected.forEach((key, value) => {
            idsSelected.push(value);
        });
        estudios.forEach((estudio) => {
            idsSelected.forEach((id) => {
                if (id === estudio.id) {
                    idsInList.push(id);
                }
            });
        });
        const idsToAdd = idsSelected.filter(x => !idsInList.includes(x));
        if (idsToAdd.length > 0) {
            setEstudiosToAdd(estudiosAgregar.filter(x => idsToAdd.includes(x.id)));
            setSuccess(true);
            setAlert(true);
        } else {
            setAlert(true);
        }
        setSelected(new Map([]));
    };

    const handleAgregarEstudiosATabla = () => {
        agregarEstudiosTabla(estudiosToAdd);
        setEstudiosToAdd([]);
        setAlert(false);
        setSuccess(false);
    };

    const alertClickHandler = () => {
        setAlert(false);
        setEstudiosToAdd([]);
        setSuccess(false);
    };

    const ElementosCargados = () => (
        <AgregarEstudioList
          estudios={ estudiosToAdd }
          selected={ selected }
          hiddenCheckBox
        />
    );
    const successMessage = 'Los siguientes estudios serán cargados al listado';
    const errorMessage = 'Todos los estudios seleccionados ya se encuentran en la tabla';

    return (
        <Modal show={ show } className='agregar-estudio'>
            <Modal.Header>
                <strong>Agregar Estudios</strong>
            </Modal.Header>
            <Modal.Body>
                <AgregarEstudioList
                  estudios={ estudiosAgregar }
                  estudiosApiLoading={ estudiosAgregarApiLoading }
                  onClickIcon={ handleClick }
                  selected={ selected }
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                  onClick={ handleAgregarSelected }
                  bsStyle='primary'
                  disabled={ selected.size === 0 }
                >
                    Agregar
                </Button>
                <Button
                  onClick={ onClickClose }
                  bsStyle='danger'
                >
                    Cerrar
                </Button>
            </Modal.Footer>
            <AlertModal
              isOpen={ alert }
              title={ success ? successMessage : '' }
              doLabel={ success ? 'Agregar' : '' }
              dontLabel={ success ? 'Cancelar' : 'Entendido' }
              onClickDo={ handleAgregarEstudiosATabla }
              onClickClose={ alertClickHandler }
              buttonStyle={ success ? 'primary' : 'danger' }
              content={ success ? <ElementosCargados /> : errorMessage }
            />
        </Modal>
    );
}

export function ModalComprobante(props) {
    const {
        show,
        onClickClose,
        componentState,
    } = props;

    return (
        <Modal show={ show } className='comprobante'>
            <form onSubmit={ e => e.preventDefault() }>
                <Modal.Header>
                    <strong>Comprobante</strong>
                </Modal.Header>
                <Modal.Body>
                    <Comprobante
                      tipo={ componentState.tipo }
                      setTipo={ componentState.setTipo }
                      subTipo={ componentState.subTipo }
                      setSubTipo={ componentState.setSubTipo }
                      responsable={ componentState.responsable }
                      setResponsable={ componentState.setResponsable }
                      gravado={ componentState.gravado }
                      setGravado={ componentState.setGravado }
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                      bsStyle='danger'
                      onClick={ onClickClose }
                      type='button'
                    >
                        Cerrar
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
export function ModalMedicacion(props) {
    const { show, onClickClose, onClickDo, estudio } = props;
    return (
        <div className='modal-medicacion-box'>
            <Modal show={ show } className='modal-medicacion'>
                <Modal.Header>
                    <strong>Medicacion</strong>
                </Modal.Header>
                <Modal.Body>
                    <MedicacionEstudio
                      estudio={ estudio }
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                      bsStyle='primary'
                      onClick={ onClickDo }
                      type='button'
                    >
                        Cargar
                    </Button>
                    <Button
                      bsStyle='danger'
                      onClick={ onClickClose }
                      type='button'
                    >
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export function ModalFinalizarGuardar(props) {
    const {
        show,
        onClickClose,
        comprobanteState,
        fecha,
        estudios,
        id,
        crearPresentacion,
        updatePresentacion,
        finalizarPresentacion,
    } = props;
    const [periodoValue, setPeriodoValue] = useState('');
    const [finalizarButtonDisabled, setFinalizarButtonDisabled] = useState(true);
    const [guardarButtonDisabled, setGuardarButtonDisabled] = useState(true);
    useEffect(() => {
        // entries return an array of arrays consisted of keys & values of some object.
        // I want to know if this object has some empty value in it's attributes.
        const entries = Object.entries(comprobanteState);
        let entriesHasEmptyValues = false;
        entries.forEach((entry) => {
            if (entry[1] === '') {
                entriesHasEmptyValues = true;
            }
        });
        if (fecha !== '' && periodoValue !== '' && !entriesHasEmptyValues) {
            setFinalizarButtonDisabled(false);
        } else {
            setFinalizarButtonDisabled(true);
        }
        if (fecha !== '' && periodoValue !== '') {
            setGuardarButtonDisabled(false);
        } else {
            setGuardarButtonDisabled(true);
        }
    });

    return (
        <Modal show={ show } className='finalizar-guardar'>
            <Modal.Header>
                <strong>Finalizar Presentacion</strong>
            </Modal.Header>
            <Modal.Body>
                <FinalizarGuardarForm
                  periodoValue={ periodoValue }
                  onChangePeriodoValue={ e => setPeriodoValue(e.target.value) }
                  comprobanteState={ comprobanteState }
                  finalizarButtonDisabled={ finalizarButtonDisabled }
                  guardarButtonDisabled={ guardarButtonDisabled }
                  fecha={ fecha }
                  estudios={ estudios }
                  id={ id }
                  crearPresentacion={ crearPresentacion }
                  updatePresentacion={ updatePresentacion }
                  finalizarPresentacion={ finalizarPresentacion }
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                  bsStyle='danger'
                  onClick={ onClickClose }
                  type='button'
                >
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const { number, bool, func, object, string, array } = PropTypes;

ModalAgregarEstudio.propTypes = {
    show: bool.isRequired,
    onClickClose: func.isRequired,
    agregarEstudiosTabla: func.isRequired,
    estudios: array.isRequired,
    estudiosAgregar: array.isRequired,
    estudiosAgregarApiLoading: bool.isRequired,
};

ModalComprobante.propTypes = {
    show: bool.isRequired,
    onClickClose: func.isRequired,
    componentState: object.isRequired,
};

ModalFinalizarGuardar.propTypes = {
    show: bool.isRequired,
    onClickClose: func.isRequired,
    comprobanteState: object.isRequired,
    fecha: string.isRequired,
    estudios: array.isRequired,
    crearPresentacion: func,
    updatePresentacion: func,
    finalizarPresentacion: func.isRequired,
    id: number.isRequired,
};

ModalMedicacion.propTypes = {
    show: bool.isRequired,
    onClickClose: func.isRequired,
    onClickDo: func.isRequired,
    estudio: object.isRequired,
};
