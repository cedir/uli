import uuidv1 from 'uuid/v1';

export const createAlert = (msg, type = 'success') => (
    {
        id: uuidv1(),
        msg,
        type,
    }
);
