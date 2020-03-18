import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import AgregarEstudioList from './AgregarEstudioList';
import { AGREGAR_ESTUDIOS_A_TABLA } from '../actionTypes';

function ModalAgregarEstudio(props) {
    const { show, onClickClose, agregarEstudiosTabla } = props;
    const [selected, setSelected] = useState(new Map([]));

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
        const estudiosIds = [];
        selected.forEach((value, key) => {
            estudiosIds.push(key);
        });
        if (estudiosIds.length > 0) {
            agregarEstudiosTabla(estudiosIds);
            showAlert('Estudios agregados correctamente');
        }
        setSelected(new Map([]));
    };

    return (
        <Modal show={ show } className='modal-agregar-estudio'>
            <Modal.Body>
                <AgregarEstudioList
                  onClickIcon={ handleClick }
                  selected={ selected }
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                  onClick={ handleAgregarSelected }
                  bsStyle='primary'
                >
                    Agregar
                </Button>
                <Button onClick={ onClickClose } >
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        agregarEstudiosTabla: ids =>
            dispatch({ type: AGREGAR_ESTUDIOS_A_TABLA, ids }),
    };
}

ModalAgregarEstudio.propTypes = {
    show: PropTypes.bool.isRequired,
    onClickClose: PropTypes.func.isRequired,
    agregarEstudiosTabla: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ModalAgregarEstudio);
