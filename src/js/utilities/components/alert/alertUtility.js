import uuidv1 from 'uuid/v1';

// type valid values: "success", "warning", "danger", "info"
export const createAlert = (msg, type = 'success') => (
    {
        id: uuidv1(),
        msg,
        type,
    }
);
