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
