const INITIAL_STATE = {
    user: null,
}
export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case "User" :
        return {...state, user: action.payload}
        default:
            return state
    }
}