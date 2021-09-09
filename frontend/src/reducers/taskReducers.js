import { TASK_CREATE_FAIL, TASK_CREATE_REQUEST, TASK_CREATE_RESET, TASK_CREATE_SUCCESS, TASK_DELETE_FAIL, TASK_DELETE_REQUEST, TASK_DELETE_SUCCESS, TASK_DETAILS_FAIL, TASK_DETAILS_REQUEST, TASK_DETAILS_SUCCESS, TASK_LIST_FAIL, TASK_LIST_REQUEST, TASK_LIST_SUCCESS, TASK_MY_FAIL, TASK_MY_REQUEST, TASK_MY_SUCCESS, TASK_START_FAIL, TASK_START_REQUEST, TASK_START_SUCCESS, TASK_SUBMIT_FAIL, TASK_SUBMIT_REQUEST, TASK_SUBMIT_SUCCESS, TASK_UPDATE_FAIL, TASK_UPDATE_REQUEST, TASK_UPDATE_RESET, TASK_UPDATE_SUCCESS, TASK_UPLOAD_FAIL, TASK_UPLOAD_REQUEST, TASK_UPLOAD_RESET, TASK_UPLOAD_SUCCESS } from "../constants/taskConstants";

export const taskListReducer = (state = {tasks:[]}, action) => {
    switch(action.type){
        case TASK_LIST_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case TASK_LIST_SUCCESS:
            return{
                loading:false,
                tasks: action.payload
            }
        case TASK_LIST_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}

export const taskDetailsReducer = (
    state = {task:{user:{}, progressUser: {}}},
    action
  ) => {
    switch (action.type) {
      case TASK_DETAILS_REQUEST:
        return { ...state, loading: true }
      case TASK_DETAILS_SUCCESS:
        return { loading: false, task: action.payload }
      case TASK_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

export const myTaskReducer = (state = {tasks:[]}, action) => {
  switch(action.type){
    case TASK_MY_REQUEST:
      return{
        ...state, 
        loading: true,
      }
    case TASK_MY_SUCCESS:
      return{
        loading:false,
        tasks:action.payload
      }
    case TASK_MY_FAIL:
      return{
        loading:false,
        error: action.payload
      }
    default:
      return state
    
  }
}

export const taskCreateReducer = (state = {}, action) => {
  switch(action.type){
    case TASK_CREATE_REQUEST:
      return{
        loading:true,
      }
    case TASK_CREATE_SUCCESS:
      return{
        loading:false,
        success:true,
        task:action.payload
      }
    case TASK_CREATE_FAIL:
      return{
        loading:false, error: action.payload
      }
    case TASK_CREATE_RESET:
      return{

      }
    default:
      return state

  }
}

export const taskUpdateReducer = (state = {task: {}}, action) => {
  switch(action.type){
    case TASK_UPDATE_REQUEST:
      return{
        loading:true,
      }
    case TASK_UPDATE_SUCCESS:
      return{
        loading:false, success: true, task: action.payload
      }
    case TASK_UPDATE_FAIL:
      return{
        loading:false, error:action.payload
      }
    case TASK_UPDATE_RESET:
      return{task: {} }
    default:
      return state
  }
}

export const taskDeleteReducer = (state = {}, action) => {
  switch(action.type){
    case TASK_DELETE_REQUEST:
      return{
        loading:true,
      }
    case TASK_DELETE_SUCCESS:
      return {
        loading:false, success:true,
      }
    case TASK_DELETE_FAIL:
      return{
        loading:false, error: action.payload
      }
    default:
      return state
  }
}

export const taskStartReducer = (state = {}, action) => {
  switch(action.type){
    case TASK_START_REQUEST:
      return{
        loading: true,
      }
    case TASK_START_SUCCESS:
      return{
        loading: false,
        success: true,
      }
    case TASK_START_FAIL:
      return{
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}


export const taskSubmitReducer = (state = {}, action) => {
  switch(action.type){
    case TASK_SUBMIT_REQUEST:
      return{
        loading: true,
      }
    case TASK_SUBMIT_SUCCESS:
      return{
        loading: false,
        success: true,
      }
    case TASK_SUBMIT_FAIL:
      return{
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const taskUploadReducer = (state = {}, action) => {
  switch(action.type){
    case TASK_UPLOAD_REQUEST:
      return{
        loading:true
      }
    case TASK_UPLOAD_SUCCESS:
      return{
        loading:false,
        success:true,
      }
    case TASK_UPLOAD_FAIL:
      return{
        loading:false,
      }
    case TASK_UPLOAD_RESET:
      return{

      }
    default:
      return state
  }
}