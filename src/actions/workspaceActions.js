import { CHANGE_WORKSPACE_FORM, SELECT_UNIT, ADD_WORKSPACE, ADD_WORKSPACE_SUCCESS, ADD_WORKSPACE_ERROR, FETCH_WORKSPACE, FETCH_WORKSPACE_SUCCESS, FETCH_WORKSPACE_ERROR } from "../constants/actionContants";
import LModel from "../services/api";
import { toast } from 'bulma-toast'

export const changeForm = (dispatch) => (name, value, others) => dispatch({
    type: CHANGE_WORKSPACE_FORM,
    payload: {
        name: name,
        value: value,
        ...others
    }
})

export const selectUnit = (dispatch) => (unit) => dispatch({
    type: SELECT_UNIT,
    unit: unit
})

export const addWorkspace = (dispatch) => (form) => {
    console.log('addWorkspace ', form)
    dispatch({
        type: ADD_WORKSPACE,
        form: form
    })
    LModel.create('WorkspaceSubscriptions', form)
        .then(response => {
            dispatch({
                type: ADD_WORKSPACE_SUCCESS,
                payload: {
                    workspace: response
                }
            })
        })
        .catch(error => {
            dispatch({
                type: ADD_WORKSPACE_ERROR,
                error: error
            })
        })
}

export const fetchWorkpaceBookings = dispatch => () => {
    dispatch({
        type: FETCH_WORKSPACE,
    })
    LModel.findRelated('Accounts', 'workspaceSubscriptions', 'me', 'filter[include]=service&filter[include]=pricing')
    .then(response => {
        dispatch({
            type: FETCH_WORKSPACE_SUCCESS,
            payload:{
                data: response
            }
        })
    })
    .catch(error => {
        dispatch({
            type: FETCH_WORKSPACE_ERROR,
            error: error
        })
        toast({
        message: "Error loading Workspace bookings",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true
        });
    })
}