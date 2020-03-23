import React from 'react';
import PropTypes from 'prop-types';
import AddMedicamentosForm from './AddMedicamentosForm';
import MedicacionEstudioList from './MedicacionEstudioList';

const MedicacionEstudio = ({ estudio }) => (
    <div>
        <AddMedicamentosForm
          estudio={ estudio }
        />
        <h4>Medicacion Seleccionada</h4>
        <MedicacionEstudioList />
    </div>
);

MedicacionEstudio.propTypes = {
    estudio: PropTypes.object.isRequired,
};

export default MedicacionEstudio;
