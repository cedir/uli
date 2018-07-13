import React from 'react';

import SearchPresentacionesObraSocial from './SearchPresentacionesObraSocial';
import PresentacionesObraSocialList from './PresentacionesObraSocialList';

const PresentacionesObraSocialPage = () => (
    <div>
        <h1>Presentaciones a obra social</h1>
        <SearchPresentacionesObraSocial />
        <PresentacionesObraSocialList />
    </div>
);

export default PresentacionesObraSocialPage;
