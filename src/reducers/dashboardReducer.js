import { TOGGLE_HAS_IMAGE } from "../constants/actionContants";

export const initialState = {
  loading: false,
  hasImage: false,
  image: null
}

export default (state, action) => {
  switch (action.type) {
    case TOGGLE_HAS_IMAGE:
      return {
        ...state,
        hasImage: action.hasImage,
        image: action.image
      }
    default:
      return state
    }
}