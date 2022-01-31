export const setUser = (data) => async (dispatch) => {
    dispatch({type: "User" , payload : data})
}

export const setCover = (data) => async (dispatch) => {
    dispatch({type: "Cover" , payload : data})
}

export const setUserData = (data) => async (dispatch) => {
    dispatch({type: "UserData" , payload : data})
}

export const setAudioBtn = (data) => async (dispatch) => {
    dispatch({type: "AudioBtn" , payload : data})
}

export const setAudioID = (data) => async (dispatch) => {
    dispatch({type: "AudioID" , payload : data})
}
export const setUserActive = (data) => async (dispatch) => {
    dispatch({type: "userActive" , payload : data})
}
export const setItemLikes = (data) => async (dispatch) => {
    dispatch({type: "itemLikes" , payload : data})
}

export const setLikeID = (data) => async (dispatch) => {
    dispatch({type: "Likeid" , payload : data})
}
export const setSplash = (data) => async (dispatch) => {
    dispatch({type: "splahStatus" , payload : data})
}
export const setPlayStatus = (data) => async (dispatch) => {
    dispatch({type: "PlayStatus" , payload : data})
}
export const setCalenderDates = (data) => async (dispatch) => {
    dispatch({type: "CalenderDates" , payload : data})
}

export const setWorkShifts = (data) => async (dispatch) => {
    dispatch({type: "workShifts" , payload : data})
}
