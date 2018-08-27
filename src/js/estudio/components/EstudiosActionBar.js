import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button } from 'react-bootstrap/dist/react-bootstrap';

class EstudiosActionBar extends React.Component {
    constructor(props) {
        super(props);
        this.goToCreateEstudio = this.goToCreateEstudio.bind(this);
    }
    goToCreateEstudio() {
        this.props.history.push('/estudios/create');
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

const { func, object } = PropTypes;

EstudiosActionBar.propTypes = {
    history: object.isRequired,
    openSearchEstudiosModal: func.isRequired,
};

export default EstudiosActionBar;
