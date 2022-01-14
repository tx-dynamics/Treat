const INITIAL_STATE = {
    user: null,
    cover: null,
    userdata: null

}
export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case "User" :
        return {...state, user: action.payload}
        case "Cover" :
        return {...state, cover: action.payload}
        case "UserData" :
            return {...state, userdata: action.payload}
        default:
            return state
    }
}