import React from 'react';
import SearchPresentacionesObraSocial from '../../nueva-presentacion/components/SearchPresentacionesObraSocial';
import TabNavigator from '../../components/TabNavigator';

function ModificarPresentacionPage() {
    return (
        <div>
            <h1>Modificar Presentacion</h1>
            <SearchPresentacionesObraSocial
              page='modificar'
            />
            <TabNavigator
              listComponent='modificar'
            />
        </div>
    );
}

export default ModificarPresentacionPage;
