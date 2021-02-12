import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Panel, Row, Col }
    from 'react-bootstrap';
import ComprobanteSearchForm from './ComprobanteSearchForm';
import PresentacionSearchForm from './PresentacionSearchForm';
import BotonesForm from './BotonesForm';

export default function SearchPresentacionForm({
    handleSubmit,
    opcionesObraSocial,
    onSearchObraSocial,
    onChangeObraSocial,
    selectedObraSocial,
    renderMenuItemChildren,
    isLoading,
    presentacionClickHandler,
    nuevaClickHandler,
}) {
    const [presentacionesCobradas, setPresentacionesCobradas] = useState(false);

    return (
        <form
          onSubmit={
            handleSubmit(searchParams => presentacionClickHandler({
                ...searchParams,
                presentacionesCobradas,
            }))
          }
          className='search-Presentacion-form'
        >
            <Row>
                <Col md={ 12 }>
                    <Panel header='Comprobante' collapsible defaultExpanded>
                        <ComprobanteSearchForm />
                    </Panel>
                </Col>
            </Row>
            <Row>
                <Col md={ 12 }>
                    <Panel header='Datos Presentación' collapsible defaultExpanded>
                        <PresentacionSearchForm
                          opcionesObraSocial={ opcionesObraSocial }
                          onSearchObraSocial={ onSearchObraSocial }
                          onChangeObraSocial={ onChangeObraSocial }
                          selectedObraSocial={ selectedObraSocial }
                          renderMenuItemChildren={ renderMenuItemChildren }
                          isLoading={ isLoading }
                          presentacionesCobradas={ presentacionesCobradas }
                          setPresentacionesCobradas={ setPresentacionesCobradas }
                        />
                    </Panel>
                </Col>
            </Row>
            <BotonesForm
              selectedObraSocial={ selectedObraSocial }
              nuevaClickHandler={ nuevaClickHandler }
            />

        </form>
    );
}

const { func, array, bool } = PropTypes;

SearchPresentacionForm.propTypes = {
    handleSubmit: func.isRequired,
    opcionesObraSocial: array.isRequired,
    onSearchObraSocial: func.isRequired,
    onChangeObraSocial: func.isRequired,
    selectedObraSocial: array,
    renderMenuItemChildren: func.isRequired,
    isLoading: bool,
    presentacionClickHandler: func.isRequired,
    nuevaClickHandler: func.isRequired,
};
