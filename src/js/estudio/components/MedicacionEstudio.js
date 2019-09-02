import React from 'react';

import MedicacionEstudioTable from './MedicacionEstudioTable';
import AddMedicamentosForm from './AddMedicamentosForm';

class MedicacionEstudio extends React.Component {

    render() {
        return (
            <div>
                <AddMedicamentosForm />
                <h4 style={ { marginTop: '25px' } }>Medicacion Seleccionada</h4>
                <MedicacionEstudioTable />
            </div>
        );
    }
}

export default MedicacionEstudio;
