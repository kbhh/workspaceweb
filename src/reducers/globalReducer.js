import { UPLOAD_FILE, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_ERROR, SET_PAGE_TITLE } from "../constants/actionContants";

export const initialState = {
  loading: false,
  uploadSuccess: false,
  uploadError: false,
  uploadedFile: null,
  page: {
    title: '',
    location: ''
  }
}

export default (state, action) => {
  switch (action.type) {
    case UPLOAD_FILE:
      return {
        ...state,
        loading: true
      }
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state, 
        uploadedFile: action.payload.data,
        loading: false,
        uploadSuccess: true
      }
    case UPLOAD_FILE_ERROR:
      return {
          ...state,
          uploadError: true,
          loading: false
      }
    case SET_PAGE_TITLE:
      return {
        ...state,
        page: {
          ...state.page,
          title: action.title
        }
      }
    default:
      return state
    }
}