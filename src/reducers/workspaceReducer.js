import { CHANGE_WORKSPACE_FORM, SELECT_UNIT, ADD_WORKSPACE, ADD_WORKSPACE_SUCCESS, ADD_WORKSPACE_ERROR, FETCH_WORKSPACE, FETCH_WORKSPACE_SUCCESS, FETCH_WORKSPACE_ERROR } from "../constants/actionContants";

export const initialState = {
  loading: false,
  form: {
    location: null,
    deskType: '',
    serviceId: '',
    pricingId: '',
    duration: '',
    unit: '',
    numberOfDesks: 0
  },
  selectedService: null,
  selectedPricing: null,
  workspaceAdd: {
    status: '',
    workspace: null,
    error: null
  },
  workspaces: {
    status: '',
    data: [],
    error: null
  }
}

export default (state, action) => {
  switch (action.type) {
    case CHANGE_WORKSPACE_FORM:
      let form = {...state.form}
      form[action.payload.name] = action.payload.value
      return {
        ...state,
        form: form,
      }
    case SELECT_UNIT:
      return {
        ...state, 
        unit: action.unit
      }
    case ADD_WORKSPACE:
      return {
        ...state,
        loading: true
      }
    case ADD_WORKSPACE_SUCCESS:
      return {
        ...state,
        loading: false,
        workspaceAdd: {
          status: 'success',
          workspace: action.payload.data
        }
      }
    case ADD_WORKSPACE_ERROR:
      return {
        ...state,
        loading: false,
        workspaceAdd: {
          state: 'error',
          error: action.error
        }
      }
    case FETCH_WORKSPACE:
      return {
        ...state,
        loading: true
      }
    case FETCH_WORKSPACE_SUCCESS:
      return {
        ...state,
        workspaces: {
          data: action.payload.data
        },
        loading: false
      }
    case FETCH_WORKSPACE_ERROR:
      return {
        ...state,
        workspaces: {
          error: action.error,
          status: 'error'
        }
      }
    default:
      return state
    }
}