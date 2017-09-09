/* This pair of function aims to persis and recover require state
/* locally. For example, If the user is logged in, the auth token is saved in local storage. */
export function loadLocallyPersistedState() {
    try {
        const serializedState = sessionStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }

        const state = JSON.parse(serializedState);

        return state;
    } catch (err) {
        return undefined;
    }
}

export function saveStateLocally(state) {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('state', serializedState);
    } catch (err) {
        // Do nothing if set item fails.
        (f => (f))();
    }
}

export function removeStateLocally() {
    try {
        sessionStorage.removeItem('state');
    } catch (err) {
        // Do nothing if set item fails.
        (f => (f))();
    }
}
