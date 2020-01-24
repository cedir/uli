import React from 'react';
import SearchPresentacionesObraSocial from './SearchPresentacionesObraSocial';
import TabNavigator from './TabNavigator';

function NuevaPresentacionPage() {
    return (
        <div>
            <h1>Crear Nueva Presentacion</h1>
            <SearchPresentacionesObraSocial />
            <TabNavigator />
        </div>
    );
}

export default NuevaPresentacionPage;
