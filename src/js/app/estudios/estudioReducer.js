export function estudioReducer(state=[], action){
    switch(action.type){
        case 'FETCH_ESTUDIOS_DIARIOS':
        case 'CANCEL_ESTUDIOS_DIARIOS':
            return [];
        case 'LOAD_ESTUDIOS_DIARIOS':
            return action.data.results;
        default:
            return state;
    }
}
