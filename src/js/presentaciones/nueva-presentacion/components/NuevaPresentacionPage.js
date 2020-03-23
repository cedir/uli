import React from 'react';
import SearchPresentacionesObraSocial from './SearchPresentacionesObraSocial';
import TabNavigator from '../../../presentaciones/components/TabNavigator';

function NuevaPresentacionPage() {
    return (
        <div>
            <h1>Nueva Presentacion</h1>
            <SearchPresentacionesObraSocial
              page='nueva'
            />
            <TabNavigator
              listComponent='nueva'
            />
        </div>
    );
}

export default NuevaPresentacionPage;
