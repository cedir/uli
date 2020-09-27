import React, { useRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import { useParams } from 'react-router';
import { Button } from 'react-bootstrap/dist/react-bootstrap';
import MedicacionEstudioTable from './MedicacionEstudioTable';
import AddMedicamentosForm from './AddMedicamentosForm';
import './MedicacionEstudioTable.css';

function MedicacionEstudio({
    paciente,
    descripcionPractica,
    fechaEstudio,
 }) {
    const params = useParams();
    const componentRef = useRef(null);

    const [showPaciente, setShowPaciente] = useState(false);

    const medicacionContent = useCallback(
        () => componentRef.current,
        [componentRef.current],
    );

    const handlePrint = useReactToPrint({
        content: medicacionContent,
        onBeforeGetContent: () => { setShowPaciente(true); },
        onAfterPrint: () => { setShowPaciente(false); },
        removeAfterPrint: true,
    });

    return (
        <div>
            <AddMedicamentosForm params={ params } />
            <h4 style={ { marginTop: '25px' } }>Medicacion Seleccionada</h4>
            <MedicacionEstudioTable
              params={ params }
              showPaciente={ showPaciente }
              ref={ componentRef }
              paciente={ paciente }
              descripcionPractica={ descripcionPractica }
              fechaEstudio={ fechaEstudio }
            />
            <Button bsStyle='primary' onClick={ handlePrint }> Imprimir medicación</Button>
        </div>
    );
}

const { string, object } = PropTypes;

MedicacionEstudio.propTypes = {
    paciente: object.isRequired,
    descripcionPractica: string.isRequired,
    fechaEstudio: string.isRequired,
};

export default MedicacionEstudio;
