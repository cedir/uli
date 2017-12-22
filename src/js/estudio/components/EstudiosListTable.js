import React from 'react';
import { connect } from 'react-redux';
import { Table }
    from 'react-bootstrap/dist/react-bootstrap';

import EstudioListTableRow from './EstudioListTableRow';
import { RESET_ESTUDIO_DETAIL } from '../actionTypes';

const { array, object, func } = React.PropTypes;

class EstudiosListTable extends React.Component {
    constructor(props) {
        super(props);

        this.navigateToEstudioDetail = this.navigateToEstudioDetail.bind(this);
    }

    navigateToEstudioDetail(estudioId) {
        this.props.resetEstudioDetail();
        this.props.history.push(`/estudios/detail/${estudioId}`);
    }

    render() {
        return (
            <div>
                <Table striped responsive style={ { marginTop: '20px' } }>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Nombre Paciente</th>
                            <th>Obra Social</th>
                            <th>Tipo de estudio</th>
                            <th>Medico actuante</th>
                            <th>Medico solicitante</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.estudios.map(estudio => (
                            <EstudioListTableRow
                              key={ estudio.id }
                              estudio={ estudio }
                              onRowClick={ this.navigateToEstudioDetail }
                            />
                        )) }
                    </tbody>
                </Table>
            </div>
        );
    }
}

EstudiosListTable.propTypes = {
    history: object.isRequired,
    estudios: array.isRequired,
    resetEstudioDetail: func.isRequired,
};

EstudiosListTable.defaultProps = {
    estudios: [],
};

function mapStateToProps(state) {
    return {
        estudios: state.estudiosReducer.estudios,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        resetEstudioDetail: () => dispatch({ type: RESET_ESTUDIO_DETAIL }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EstudiosListTable);
