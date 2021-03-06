import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, change, formValueSelector } from 'redux-form';
import { FETCH_OBRAS_SOCIALES } from '../../../obraSocial/actionTypes';
import { FETCH_PRESENTACIONES_OBRA_SOCIAL } from '../../actionTypes';
import { FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL } from '../../nueva-presentacion/actionTypes';
import initialState from '../../nueva-presentacion/estudiosSinPresentarReducerInitialState';
import SearchPresentacionForm from './SearchPresentacionForm';

function SearchPresentaciones(props) {
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

    return (
        <React.Fragment>
            <SearchPresentacionForm
              opcionesObraSocial={ props.obrasSociales }
              onSearchObraSocial={ searchObrasSociales }
              onChangeObraSocial={ setSelectedObraSocial }
              selectedObraSocial={ props.selectedObraSocial }
              renderMenuItemChildren={ renderObraSocialMenuItem }
              isLoading={ props.obrasSocialesApiLoading }
              handleSubmit={ props.handleSubmit }
              presentacionClickHandler={ presentacionClickHandler }
              nuevaClickHandler={ nuevaClickHandler }
            />
        </React.Fragment>
    );
}

const SearchPresentacionesReduxForm =
    reduxForm({
        form: 'SearchPresentaciones',
        destroyOnUnmount: false,
        enableReinitialize: true,
    })(SearchPresentaciones);

const { func, array, bool, object } = PropTypes;

SearchPresentaciones.propTypes = {
    handleSubmit: func.isRequired,
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

SearchPresentaciones.defaultProps = {
    estudios: initialState.estudios,
};

const selector = formValueSelector('SearchPresentaciones');

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
            filtros: params,
        }),
        fetchEstudiosSinPresentarObraSocial: obraSocial => dispatch({
            type: FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
            obraSocial: obraSocial[0],
        }),
        setSelectedObraSocial: obraSocial =>
            dispatch(change('SearchPresentaciones', 'obraSocial', obraSocial)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPresentacionesReduxForm);
