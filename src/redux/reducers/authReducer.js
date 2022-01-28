const INITIAL_STATE = {
    user: false,
    cover: null,
    userdata: null,
    audioBtn : false,
    audioID : 0,
    userActive:false,
    ItemLikes:[],
    likeId:[],
    SplahStatus:true,
    PlayStatus: false,
    calenderDates:[]
}

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case "User" :
        return {...state, user: action.payload}
        case "Cover" :
        return {...state, cover: action.payload}
        case "UserData" :
            return {...state, userdata: action.payload}
        case "AudioBtn" :
            return {...state, audioBtn: action.payload}
        case "AudioID" :
            return {...state, audioID: action.payload}
        case "userActive" :
                return {...state, userActive: action.payload}
        case "itemLikes" :
                    return {...state, ItemLikes: action.payload}
        case "Likeid" :
            return {...state, likeId: action.payload}
        case "splashStatus" :
            return {...state, SplahStatus: action.payload}
        case "PlayStatus" :
            return {...state, PlayStatus: action.payload}
        case "CalenderDates" :
                return {...state, calenderDates: action.payload}
        default:
            return state
    }
}