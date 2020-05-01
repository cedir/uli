import React from 'react';
import { Button } from 'react-bootstrap/dist/react-bootstrap';
import { useHistory } from 'react-router-dom';

const NotFoundPage = () => {
    const history = useHistory();
    const text =
    `
        La pagina no contiene información disponible
    `;

    const goBackHandler = () => {
        history.goBack();
    };

    return (
        <div className='not-found-page'>
            {text}
            <Button
              bsStyle='primary'
              onClick={ goBackHandler }
            >
                Volver atras
            </Button>
        </div>
    );
};

export default NotFoundPage;
