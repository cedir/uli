import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Glyphicon, Row, Col } from 'react-bootstrap';
import InputRF from '../../../utilities/InputRF';
import { dateBeforeThan, dateAfterThan } from '../../../utilities/reduxFormValidators';

function FechaForm({ removeDate }) {
    const style = { marginTop: '3rem', cursor: 'pointer' };
    return (
        <React.Fragment>
            <fieldset>
                <legend>Periodo</legend>
                <Row>
                    <Col md={ 10 }>
                        <Field
                          name='fechaDesde'
                          type='date'
                          label='Desde'
                          component={ InputRF }
                          validate={ dateBeforeThan('fechaHasta', 'Debe ser menor que la fecha hasta') }
                        />
                    </Col>
                    <Col md={ 1 }>
                        <Glyphicon
                          glyph='remove'
                          onClick={ () => removeDate('fechaDesde') }
                          style={ style }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={ 10 }>
                        <Field
                          name='fechaHasta'
                          type='date'
                          label='Hasta'
                          component={ InputRF }
                          validate={ dateAfterThan('fechaDesde', 'Debe ser mayor que la fecha desde') }
                        />
                    </Col>
                    <Col md={ 1 }>
                        <Glyphicon
                          glyph='remove'
                          onClick={ () => removeDate('fechaHasta') }
                          style={ style }
                        />
                    </Col>
                </Row>
            </fieldset>
        </React.Fragment>
    );
}

const { func } = PropTypes;

FechaForm.propTypes = {
    removeDate: func.isRequired,
};

export default FechaForm;
