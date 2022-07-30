import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { myTaskReducer, taskCompleteReducer, taskCreateReducer, taskDeleteReducer, taskDetailsReducer, taskListReducer, taskPayReducer, taskStartReducer, taskSubmitReducer, taskUpdateReducer, taskUploadReducer } from './reducers/taskReducers'
import { userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducers'
import { fileDeleteReducer } from './reducers/fileReducers'

const reducer = combineReducers({
    taskList: taskListReducer,
    taskDetails: taskDetailsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    myTasks: myTaskReducer,
    taskCreate: taskCreateReducer,
    taskDelete: taskDeleteReducer,
    taskUpdate: taskUpdateReducer,
    taskStart: taskStartReducer,
    taskSubmit: taskSubmitReducer,
    taskComplete: taskCompleteReducer,
    taskUpload: taskUploadReducer,
    fileDelete: fileDeleteReducer,
    taskPay : taskPayReducer
})


const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
      userLogin: { userInfo: userInfoFromStorage },
}


const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store