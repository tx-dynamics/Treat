export const setUser = (data) => async (dispatch) => {
    dispatch({type: "User" , payload : data})
}

export const setCover = (data) => async (dispatch) => {
    dispatch({type: "Cover" , payload : data})
}
