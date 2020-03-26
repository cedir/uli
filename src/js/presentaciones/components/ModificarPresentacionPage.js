import React from 'react';
import SearchPresentacionesObraSocial from '../nueva-presentacion/components/SearchPresentacionesObraSocial';
import TabNavigator from '../nueva-presentacion/components/TabNavigator';
import ModificarPresentacionList from './ModificarPresentacionList';

function ModificarPresentacionPage() {
    return (
        <div>
            <h1>Modificar Presentacion</h1>
            <SearchPresentacionesObraSocial
              page='Modificar'
            />
            <TabNavigator
              listComponent={ <ModificarPresentacionList /> }
            />
        </div>
    );
}

export default ModificarPresentacionPage;
