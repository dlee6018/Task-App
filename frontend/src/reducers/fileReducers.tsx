import { FILE_DELETE_FAIL, FILE_DELETE_REQUEST, FILE_DELETE_RESET, FILE_DELETE_SUCCESS } from "../constants/fileConstants";

export const fileDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case FILE_DELETE_REQUEST:
            return{
                loading:true,
            }
        case FILE_DELETE_SUCCESS:
            return{
                loading:false,
                success:true,
            }
        case FILE_DELETE_FAIL:
            return{
                loading: false,
                error:action.payload
            }
        case FILE_DELETE_RESET:
            return{

            }
        default:
            return state
    }
}