import React, { useRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { useParams } from 'react-router';
import MedicacionEstudioTable from './MedicacionEstudioTable';
import AddMedicamentosForm from '../AddMedicamentosForm';
import BotonesMedicacionFooter from './BotonesMedicacionFooter';
import { DELETE_ALL_MEDICACION } from '../../../medicacion/actionTypes';
import './MedicacionEstudioTable.css';

function MedicacionEstudio({
    paciente,
    practica,
    fechaEstudio,
    removeMedicacion,
    idEstudio,
}) {
    const params = useParams();
    const componentRef = useRef(null);
    const onBeforeGetContentResolve = useRef(Promise.resolve);

    const [showPaciente, setShowPaciente] = useState(false);
    const [filtrarEspecificos, setFiltrarEspecificos] = useState(false);

    const medicacionContent = useCallback(
        () => componentRef.current,
        [componentRef.current],
    );

    const handlePrint = useReactToPrint({
        content: medicacionContent,
        onBeforeGetContent: () => new Promise((resolve) => {
            onBeforeGetContentResolve.current = resolve;
            setShowPaciente(true);
            setFiltrarEspecificos(true);
            resolve();
        }),
        onAfterPrint: () => {
            setShowPaciente(false);
            setFiltrarEspecificos(false);
        },
        removeAfterPrint: true,
    });

    React.useEffect(() => {
        if (showPaciente && filtrarEspecificos && typeof onBeforeGetContentResolve.current === 'function') {
            onBeforeGetContentResolve.current();
        }
    }, [onBeforeGetContentResolve.current, showPaciente, filtrarEspecificos]);

    return (
        <div>
            <AddMedicamentosForm params={ params } />
            <h4 style={ { marginTop: '25px' } }>Medicacion Seleccionada</h4>
            <MedicacionEstudioTable
              params={ params }
              showPaciente={ showPaciente }
              ref={ componentRef }
              paciente={ paciente }
              practica={ practica }
              fechaEstudio={ fechaEstudio }
              filtrarEspecificos={ filtrarEspecificos }
            />
            <BotonesMedicacionFooter
              handlePrint={ handlePrint }
              removeMedicacion={ () => removeMedicacion(idEstudio) }
            />
        </div>
    );
}

const { string, object, func, number } = PropTypes;

MedicacionEstudio.propTypes = {
    paciente: object,
    practica: object,
    fechaEstudio: string,
    removeMedicacion: func.isRequired,
    idEstudio: number.isRequired,
};

function mapStateToProps(state) {
    return {
        apiLoading: state.medicacionReducer.apiLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        removeMedicacion: idEstudio => dispatch({ type: DELETE_ALL_MEDICACION, idEstudio }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicacionEstudio);
