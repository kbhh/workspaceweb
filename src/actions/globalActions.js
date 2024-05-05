import { UPLOAD_FILE, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_ERROR, SET_PAGE_TITLE } from "../constants/actionContants";
import LModel from "../services/api";

export const uploadFile = (dispatch) =>  (container, file, cb) => {
    
    dispatch({
        type: UPLOAD_FILE,
        payload: {
            container, file
        }
    })

    LModel.upload(container, file)
        .then(response => {
            dispatch({
                type: UPLOAD_FILE_SUCCESS,
                payload: {
                    data: response
                }
            })
            cb(response)
        })
        .catch(error => {
            dispatch({
                type: UPLOAD_FILE_ERROR,
                payload: {
                    error: error.response
                }
            })
        })
}

export const setTitle = (dispatch) => (title) => {
    const baseTitle = 'blueSpace - where work meets life'
    document.title = title + ' | ' + baseTitle
    dispatch({
        type: SET_PAGE_TITLE,
        title: title
    })
}