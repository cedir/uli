import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Row } from 'react-bootstrap/dist/react-bootstrap';
import { reduxForm, change, formValueSelector } from 'redux-form';
// import AsyncTypeaheadRF from '../../utilities/AsyncTypeaheadRF';
// import { requiredOption } from '../../utilities/reduxFormValidators';
import { FETCH_OBRAS_SOCIALES } from '../../obraSocial/actionTypes';
import { FETCH_PRESENTACIONES_OBRA_SOCIAL } from '../actionTypes';
import { FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL } from '../nueva-presentacion/actionTypes';
import initialState from '../nueva-presentacion/estudiosSinPresentarReducerInitialState';
import { FiltrarPresentacionModal } from './Modals';
import { SearchPresentacionForm } from './SearchPresentacionForm';

function SearchPresentacionesObraSocial(props) {
    const [showModal, setShowModal] = useState(false);

    const setSelectedObraSocial = (selection) => {
        if (selection[0] && selection[0].id) {
            props.setSelectedObraSocial(selection[0]);
        }
    };

    const searchObrasSociales = (nombre) => {
        props.fetchObrasSociales(nombre);
    };

    const nuevaClickHandler = (params) => {
        const {
            fetchEstudiosSinPresentarObraSocial,
            /* eslint-disable no-unused-vars */
            estudios,
            history,
            selectedObraSocial,
            obraSocial,
        } = props;
        // Para que no se pierdan los cambios que no fueron guardados
        // En el listado de crear o modificar presentación.
        // obraSocial.id = previa obra social.id
        // selectedObraSocial[0].id = obra social seleccionada en search.
        if (!estudios.length || obraSocial.id !== selectedObraSocial[0].id) {
            fetchEstudiosSinPresentarObraSocial(params);
        }
        history.push('/presentaciones-obras-sociales/nueva-presentacion');
    };

    const presentacionClickHandler = (params) => {
        const { loadPresentacionObraSocialId } = props;
        loadPresentacionObraSocialId(params);
    };

    const renderObraSocialMenuItem = option => (
        <div key={ option.id }>
            { option.nombre }
        </div>
    );
    const boton = (params, bandera) => {
        if (bandera) {
            nuevaClickHandler(params);
        } else {
            presentacionClickHandler(params);
        }
    };

    return (
        <React.Fragment>
            <FiltrarPresentacionModal
              modalOpened={ showModal }
              setShowModal={ setShowModal }
            />
            <SearchPresentacionForm
              opcionesObraSocial={ props.obrasSociales }
              onSearchObraSocial={ searchObrasSociales }
              onChangeObraSocial={ setSelectedObraSocial }
              selectedObraSocial={ props.selectedObraSocial }
              renderMenuItemChildren={ renderObraSocialMenuItem }
              isLoading={ props.obrasSocialesApiLoading }
              handleSubmit={ props.handleSubmit }
              apretar={ boton }
              // presentacionClickHandler={ presentacionClickHandler }
              // nuevaClickHandler={ nuevaClickHandler }
            />
        </React.Fragment>
    );
}


const SearchPresentacionesObraSocialReduxForm =
    reduxForm({
        form: 'searchPresentacionesObraSocial',
        destroyOnUnmount: false,
        enableReinitialize: true,
    })(SearchPresentacionesObraSocial);

const { func, array, bool, object } = PropTypes;

SearchPresentacionesObraSocial.propTypes = {
    handleSubmit: func.isRequired,
    // valid: bool.isRequired,
    fetchObrasSociales: func.isRequired,
    loadPresentacionObraSocialId: func.isRequired,
    fetchEstudiosSinPresentarObraSocial: func.isRequired,
    setSelectedObraSocial: func.isRequired,
    selectedObraSocial: array,
    obrasSociales: array,
    obrasSocialesApiLoading: bool,
    history: object.isRequired,
    estudios: array.isRequired,
    obraSocial: object.isRequired,
};

SearchPresentacionesObraSocial.defaultProps = {
    estudios: initialState.estudios,
};

const selector = formValueSelector('searchPresentacionesObraSocial');

function mapStateToProps(state) {
    let obraSocial = selector(state, 'obraSocial');
    obraSocial = (obraSocial && Array.isArray(obraSocial))
        ? obraSocial
        : [];
    return {
        selectedObraSocial: obraSocial,
        obrasSociales: state.obraSocialReducer.obrasSociales,
        obrasSocialesApiLoading: state.obraSocialReducer.isLoading || false,
        estudios: state.estudiosSinPresentarReducer.estudios,
        obraSocial: state.estudiosSinPresentarReducer.obraSocial,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchObrasSociales: nombre => dispatch({ type: FETCH_OBRAS_SOCIALES, nombre }),
        loadPresentacionObraSocialId: params => dispatch({
            type: FETCH_PRESENTACIONES_OBRA_SOCIAL,
            id: params.obraSocial[0].id,
        }),
        fetchEstudiosSinPresentarObraSocial: params => dispatch({
            type: FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
            obraSocial: params.obraSocial[0],
        }),
        setSelectedObraSocial: obraSocial =>
            dispatch(change('searchPresentacionesObraSocial', 'obraSocial', obraSocial)),
    };
}

export default
    connect(mapStateToProps, mapDispatchToProps)(SearchPresentacionesObraSocialReduxForm);
