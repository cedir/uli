import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap/dist/react-bootstrap';

class EstudiosActionBar extends React.Component {
    constructor(props) {
        super(props);
        this.goToCreateEstudio = this.goToCreateEstudio.bind(this);
    }
    goToCreateEstudio() {
        this.props.history.push('/estudios/createoredit/create');
    }
    render() {
        return (
            <ButtonToolbar>
                <Button
                  onClick={ this.props.openSearchEstudiosModal }
                >
                    Buscar estudio</Button>
                <Button
                  bsStyle='primary'
                  onClick={ this.goToCreateEstudio }
                >
                    Agregar estudio
                </Button>
            </ButtonToolbar>
        );
    }
}

const { func, object } = React.PropTypes;

EstudiosActionBar.propTypes = {
    history: object.isRequired,
    openSearchEstudiosModal: func.isRequired,
};

export default EstudiosActionBar;
