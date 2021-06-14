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
    practica,
    fechaEstudio,
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
            <Button bsStyle='primary' onClick={ handlePrint }> Imprimir medicación</Button>
        </div>
    );
}

const { string, object } = PropTypes;

MedicacionEstudio.propTypes = {
    paciente: object,
    practica: object,
    fechaEstudio: string,
};

export default MedicacionEstudio;
