import { SET_LOGOUT_SUCCESS, SET_LOGIN_BEGIN, SET_LOGIN_FAIL, SET_LOGIN_SUCCESS, SET_LOGOUT_FAIL} from "./constants"

const initState = {
    isLogin: false,
    isLoading: false,
}   

function reducer(state,action){
    console.log('state: '+state)
    console.log('action.type: '+action.type)
    switch(action.type){
       case SET_LOGIN_BEGIN:
            return{
                ...state,
                isLoading: true
            };
        case SET_LOGIN_SUCCESS:
            return {
                isLogin:true,
                isLoading: false
            }
        case SET_LOGIN_FAIL:
            return {
                ...initState
            }
        case SET_LOGOUT_SUCCESS:
            return{
                ...initState
            }
        case SET_LOGOUT_FAIL:
            return{
                ...state,
                isLoading: false
            }
        default:
            throw new Error("Invalid Action")
        
    }
}

export {initState}
export default reducer