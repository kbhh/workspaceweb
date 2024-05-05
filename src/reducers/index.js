import authReducer from './authReducer'
import workspaceReducer from './workspaceReducer'
import locationReducer from './locationsReducer'
import globalReducer from './globalReducer'
import meetingReducer from './meetingReducer'

export const mainReducer = ({ auth, workspace, location, global, meeting }, action) => ({
  auth: authReducer(auth, action),
  workspace: workspaceReducer(workspace, action)
});