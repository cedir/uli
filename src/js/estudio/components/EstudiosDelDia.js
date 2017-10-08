import React from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap/dist/react-bootstrap';
import SearchEstudiosForm from './SearchEstudiosForm';
import EstudiosList from './EstudiosList';
import ConditionalComponents from '../../utilities/ConditionalComponent';

const { array } = React.PropTypes;

const estudiosListPanel = () => (
    <Panel header='Resultados' bsStyle='primary'>
        <EstudiosList />
    </Panel>
);

const EstudiosDelDiaPres = props => (
    <div className='ibox-content'>
        <Panel header='Buscar Estudios' bsStyle='primary'>
            <SearchEstudiosForm />
        </Panel>
        <ConditionalComponents
          component={ estudiosListPanel }
          display={ props.estudios.length > 0 }
        />
    </div>
);

EstudiosDelDiaPres.propTypes = {
    estudios: array,
};

function mapStateToProps(state) {
    return {
        estudios: state.estudiosReducer.estudios,
    };
}

export default connect(mapStateToProps)(EstudiosDelDiaPres);
