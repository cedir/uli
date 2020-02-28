import React from 'react';
import SearchPresentacionesObraSocial from './SearchPresentacionesObraSocial';
import NuevaPresentacionObraSocialList from './NuevaPresentacionObraSocialList';
import TabNavigator from './TabNavigator';

function NuevaPresentacionPage() {
    return (
        <div>
            <h1>Nueva Presentacion</h1>
            <SearchPresentacionesObraSocial />
            <TabNavigator
              listComponent={ <NuevaPresentacionObraSocialList /> }
            />
        </div>
    );
}

export default NuevaPresentacionPage;
