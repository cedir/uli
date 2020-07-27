import React from 'react';
import { useParams } from 'react-router';
import MedicacionEstudioTable from './MedicacionEstudioTable';
import AddMedicamentosForm from './AddMedicamentosForm';

function MedicacionEstudio() {
    const params = useParams();
    return (
        <div>
            <AddMedicamentosForm params={ params } />
            <h4 style={ { marginTop: '25px' } }>Medicacion Seleccionada</h4>
            <MedicacionEstudioTable params={ params } />
        </div>
    );
}

export default MedicacionEstudio;
