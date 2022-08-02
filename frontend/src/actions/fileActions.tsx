import axios from "axios"
import { FILE_DELETE_FAIL, FILE_DELETE_REQUEST, FILE_DELETE_SUCCESS } from "../constants/fileConstants"

export const deleteFile = (id) => async (dispatch) => {
    try{
        dispatch({
            type: FILE_DELETE_REQUEST
        })
        await axios.delete(`/api/file/delete/${id}`)
        dispatch({type: FILE_DELETE_SUCCESS})
      }catch(error){
        dispatch({type: FILE_DELETE_FAIL})
        console.error(error)
      }
}