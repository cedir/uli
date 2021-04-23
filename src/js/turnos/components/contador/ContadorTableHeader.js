import React from 'react';
import PropTypes from 'prop-types';
import PencilOutlineIcon from 'mdi-react/PencilOutlineIcon';
import { Col, Row } from 'react-bootstrap';

function ContadorTableHeader({ tiempos, setModalOpened }) {
    return (
        <tr>
            <th>Nombre</th>
            {tiempos.map((tiempo, key) => (
                <th key={ key }>
                    <Row>
                        <Col lg={ 5 }>{tiempo} dias</Col>
                        <Col lg={ 5 } style={ { textAlign: 'right' } }>
                            <PencilOutlineIcon onClick={ () => setModalOpened(true) } />
                        </Col>
                    </Row>
                </th>
            ))}
        </tr>
    );
}

const { array, func } = PropTypes;

ContadorTableHeader.propTypes = {
    tiempos: array.isRequired,
    setModalOpened: func.isRequired,
};

export default ContadorTableHeader;
