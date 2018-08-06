import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { ControlPagoAnestesista } from './components/ControlPagoAnestesista';
import { LineasARA } from './components/LineasARA';
import { LineasNoARA } from './components/LineasNoARA';

function getAnestesistaDisplayName(anestesista) {
    return `${anestesista.apellido}, ${anestesista.nombre}`;
}

function isASelectedAnestesista(anestesista) {
    return !isEmpty(anestesista);
}

const PagoAnestesistaPage = props => (
    <div>
        <h1>Pago a Anestesista</h1>
        <p>Detalle del Pago</p>
        <ControlPagoAnestesista />
        <div>
            { isASelectedAnestesista(props.anestesista) &&
            <h3 className='ibox-content'>
                { getAnestesistaDisplayName(props.anestesista) }
                <span>{ ` (${props.mes}/${props.anio})` }</span>
            </h3>
            }
        </div>
        <div className='ibox-content'>
            <LineasARA />
            <LineasNoARA />
        </div>
    </div>
);

const { object, number } = PropTypes;

PagoAnestesistaPage.propTypes = {
    anestesista: object,
    mes: number,
    anio: number,
};

function mapStateToProps(state) {
    return {
        anestesista: state.pago_anestesista.anestesista,
        mes: state.pago_anestesista.mes,
        anio: state.pago_anestesista.anio,
    };
}

export default connect(mapStateToProps, null)(PagoAnestesistaPage);

