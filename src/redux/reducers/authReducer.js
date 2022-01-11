const INITIAL_STATE = {
    user: null,
    cover: null
}
export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case "User" :
        return {...state, user: action.payload}
        case "Cover" :
        return {...state, cover: action.payload}
        default:
            return state
    }
}