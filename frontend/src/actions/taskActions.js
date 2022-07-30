import axios from 'axios'
import { TASK_LIST_REQUEST, TASK_LIST_SUCCESS, TASK_LIST_FAIL, TASK_DETAILS_REQUEST, TASK_DETAILS_SUCCESS, TASK_DETAILS_FAIL, TASK_MY_FAIL, TASK_MY_REQUEST, TASK_MY_SUCCESS, TASK_DELETE_REQUEST, TASK_DELETE_SUCCESS, TASK_DELETE_FAIL, TASK_CREATE_REQUEST, TASK_CREATE_SUCCESS, TASK_CREATE_FAIL, TASK_UPDATE_REQUEST, TASK_UPDATE_SUCCESS, TASK_UPDATE_FAIL, TASK_START_SUCCESS, TASK_START_REQUEST, TASK_START_FAIL, TASK_SUBMIT_REQUEST, TASK_SUBMIT_FAIL, TASK_SUBMIT_SUCCESS, TASK_COMPLETE_REQUEST, TASK_COMPLETE_SUCCESS, TASK_COMPLETE_FAIL, TASK_PAY_REQUEST, TASK_PAY_SUCCESS, TASK_PAY_FAIL } from '../constants/taskConstants'
import {logout} from '../actions/userActions'

export const listAllTasks = () => async(dispatch) => {
    try{
        dispatch({
            type:TASK_LIST_REQUEST
        })
        
        const {data} = await axios.get('/api/tasks')

        dispatch({
            type: TASK_LIST_SUCCESS,
            payload: data
        })
    }catch(error){
        console.log(error)
        dispatch({
            type: TASK_LIST_FAIL,
            payload:error
        })
    }
}

export const listTaskDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: TASK_DETAILS_REQUEST})
  
      const { data } = await axios.get(`/api/tasks/${id}`)
  
      dispatch({
        type: TASK_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: TASK_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getAllTasksByUser = () => async(dispatch, getState) => {
  try{
    dispatch({
      type: TASK_MY_REQUEST
    })

    const {userLogin: {userInfo},
    } = getState()

    const config = {
      headers:{
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.get('/api/tasks/myrequests', config)
    
    dispatch({
      type: TASK_MY_SUCCESS,
      payload:data
    })
  }catch(error){
    dispatch({
      type: TASK_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteTask = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/tasks/${id}`, config)

    dispatch({
      type: TASK_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TASK_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createTask = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/tasks`, {}, config)

    dispatch({
      type: TASK_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TASK_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateTask = (task) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/tasks/${task._id}`,
      task,
      config
    )

    dispatch({
      type: TASK_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: TASK_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TASK_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const submitTask = (id) => async(dispatch, getState) => {
  try {
    dispatch({
      type: TASK_SUBMIT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/tasks/${id}/submit`,{},
      config
    )

    dispatch({
      type: TASK_SUBMIT_SUCCESS
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TASK_SUBMIT_FAIL,
      payload: message,
    })
  }
}

export const startTask = (id) => async(dispatch, getState) => {
  try {
    dispatch({
      type: TASK_START_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/tasks/${id}/start`,{},
      config
    )

    dispatch({
      type: TASK_START_SUCCESS
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TASK_START_FAIL,
      payload: message,
    })
  }
}
export const completeTask = (id) => async(dispatch, getState) => {
  try {
    dispatch({
      type: TASK_COMPLETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/tasks/${id}/complete`,{},
      config
    )

    dispatch({
      type: TASK_COMPLETE_SUCCESS
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TASK_COMPLETE_FAIL,
      payload: message,
    })
  }
}

export const payTask = (id) => async(dispatch, getState) => {
  try{
    dispatch({
      type: TASK_PAY_REQUEST
    })

    const {
      userLogin: {userInfo}
    } = getState()

    const config = {
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }
    }

    const {data} = await axios.put(
      `/api/tasks/${id}/pay`,{},config
    )

    dispatch({
      type:TASK_PAY_SUCCESS
    })
  } catch(error){
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TASK_PAY_FAIL,
      payload: message,
    })
  }
}