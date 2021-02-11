import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Panel, Row, Col }
    from 'react-bootstrap';
import ComprobanteSearchForm from './ComprobanteSearchForm';
import TipoPresentacionSearchForm from './TipoPresentacionSearchForm';
import PresentacionSearchForm from './PresentacionSearchForm';

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
    const seleccionada = () => {
        if (selectedObraSocial.length === 0) {
            return true;
        }
        return false;
    };

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
                <Col md={ 4 }>
                    <Panel header='Tipo de Presentación'>
                        <TipoPresentacionSearchForm />
                    </Panel>
                </Col>
                <Col md={ 8 }>
                    <Panel header='Comprobante'>
                        <ComprobanteSearchForm />
                    </Panel>
                </Col>
            </Row>
            <Panel header='Datos Presentación'>
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
            <Button
              className='pull-right'
              bsStyle='primary'
              disabled={ seleccionada(selectedObraSocial) }
              onClick={ () => nuevaClickHandler(selectedObraSocial) }
            >
                Nueva
            </Button>
            <Button
              className='pull-right'
              bsStyle='primary'
              type='submit'
            >
                Buscar
            </Button>
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
