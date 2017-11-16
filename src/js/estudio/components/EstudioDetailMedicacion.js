import React from 'react';
import { Button } from 'react-bootstrap/dist/react-bootstrap';

import AddMedicamentosModal from './AddMedicamentosModal';

class EstudioDetailMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpened: false,
        };
        this.openAddMedicamentosModal = this.openAddMedicamentosModal.bind(this);
        this.closeAddMedicamentosModal = this.closeAddMedicamentosModal.bind(this);
    }

    openAddMedicamentosModal() {
        this.setState({ modalOpened: true });
    }

    closeAddMedicamentosModal() {
        this.setState({ modalOpened: false });
    }

    render() {
        return (
            <div>
                <div>Medicamento</div>
                <ul className='list-group'>
                    <li className='list-group-item'>1/3 ALAMBRE GUIA 0.35mm</li>
                    <li className='list-group-item'>1/3 ALAMBRE GUIA 0.35mm</li>
                    <li className='list-group-item'>1/3 ALAMBRE GUIA 0.35mm</li>
                    <li className='list-group-item'>1/3 ALAMBRE GUIA 0.35mm</li>
                    <li className='list-group-item'>1/3 ALAMBRE GUIA 0.35mm</li>
                </ul>
                <Button
                  onClick={ this.openAddMedicamentosModal }
                  bsStyle='primary'
                >
                    Agregar Medicamento
                </Button>
                <AddMedicamentosModal
                  modalOpened={ this.state.modalOpened }
                  closeModal={ this.closeAddMedicamentosModal }
                />
            </div>
        );
    }
}

export default EstudioDetailMain;
