import React from 'react';
import PropTypes from 'prop-types';
import SearchPresentaciones from './SearchPresentaciones';
import PresentacionesObraSocialList from './PresentacionesObraSocialList';

const PresentacionesObraSocialPage = props => (
    <div>
        <h1>Presentaciones a obra social</h1>
        <SearchPresentaciones
          history={ props.history }
        />
        <PresentacionesObraSocialList />
    </div>
);

const { object } = PropTypes;

PresentacionesObraSocialPage.propTypes = {
    history: object.isRequired,
};

export default PresentacionesObraSocialPage;
