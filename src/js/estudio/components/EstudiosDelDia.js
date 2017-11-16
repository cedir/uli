import React from 'react';
import { connect } from 'react-redux';
import EstudiosActionBar from './EstudiosActionBar';
import SearchEstudiosModal from './SearchEstudiosModal';
import EstudiosList from './EstudiosList';
import ConditionalComponents from '../../utilities/ConditionalComponent';

const { array, object } = React.PropTypes;

const estudiosListPanel = props => (
    <EstudiosList history={ props.history } />
);

estudiosListPanel.propTypes = {
    history: object,
};

const noSearchResults = () => (
    <div style={ { textAlign: 'center', marginTop: '10px' } }>
        Su busqueda no ha arrojado resultados
    </div>
);

class EstudiosDelDiaPres extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpened: false,
        };
        this.openSearchEstudiosModal = this.openSearchEstudiosModal.bind(this);
        this.closeSearchEstudiosModal = this.closeSearchEstudiosModal.bind(this);
    }

    openSearchEstudiosModal() {
        this.setState({ modalOpened: true });
    }

    closeSearchEstudiosModal() {
        this.setState({ modalOpened: false });
    }

    render() {
        return (
            <div className='ibox-content'>
                <div className='pull-right'>
                    <EstudiosActionBar
                      openSearchEstudiosModal={ this.openSearchEstudiosModal }
                      history={ this.props.history }
                    />
                </div>
                <div className='clearfix' />
                <ConditionalComponents
                  component={ estudiosListPanel }
                  history={ this.props.history }
                  display={ this.props.estudios.length > 0 }
                />
                <ConditionalComponents
                  component={ noSearchResults }
                  display={ this.props.estudios.length === 0 }
                />
                <SearchEstudiosModal
                  modalOpened={ this.state.modalOpened }
                  closeModal={ this.closeSearchEstudiosModal }
                />
            </div>
        );
    }
}

EstudiosDelDiaPres.defaultProps = {
    estudios: [],
};

EstudiosDelDiaPres.propTypes = {
    estudios: array,
    history: object.isRequired,
};

function mapStateToProps(state) {
    return {
        estudios: state.estudiosReducer.estudios,
    };
}

export default connect(mapStateToProps)(EstudiosDelDiaPres);
