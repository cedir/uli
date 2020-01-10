import React from 'react';
import SearchPresentacionObraSocial from './SearchPresentacionesObraSocial';
import TabNavigator from './TabNavigator';

function NuevaPresentacionPage() {
    return (
        <div>
            <h1>Crear Nueva Presentacion</h1>
            <SearchPresentacionObraSocial />
            <TabNavigator />
        </div>
    );
}

export default NuevaPresentacionPage;
