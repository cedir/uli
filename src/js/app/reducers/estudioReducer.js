export function estudioReducer(state=[], action){
    switch(action.type){
        case 'LOAD_ESTUDIOS_DIARIOS':
            return action.data;
        default:
            return state;
    }
}