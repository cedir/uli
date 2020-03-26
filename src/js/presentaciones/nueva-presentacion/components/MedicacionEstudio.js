import React from 'react';
import PropTypes from 'prop-types';
import AddMedicamentosForm from './AddMedicamentosForm';

const MedicacionEstudio = ({ estudio }) => (
    <div>
        <AddMedicamentosForm
          estudio={ estudio }
        />
        <h4>Medicacion Seleccionada</h4>
    </div>
);

MedicacionEstudio.propTypes = {
    estudio: PropTypes.object.isRequired,
};

export default MedicacionEstudio;
