import React from 'react';
import PropTypes from 'prop-types';
// import CalendarIcon from 'mdi-react/CalendarIcon';
import { Col, Row } from 'react-bootstrap';

function ContadorTableHeader({ tiempos }) {
    return (
        <tr>
            <th>Nombre</th>
            {tiempos.map((tiempo, key) => (
                <th key={ key }>
                    <Row>
                        <Col lg={ 5 }>{tiempo} dias</Col>
                        <Col lg={ 5 } style={ { textAlign: 'right' } }>
                            picker
                        </Col>
                    </Row>
                </th>
            ))}
        </tr>
    );
}

const { array } = PropTypes;

ContadorTableHeader.propTypes = {
    tiempos: array.isRequired,
};

export default ContadorTableHeader;
