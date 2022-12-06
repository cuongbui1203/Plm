import { useStore } from "../store"
import { 
    SET_LOGIN_SUCCESS,
    SET_LOGIN_FAIL,
    LOADING
} from "../store/constants"
import { loginApi } from '../API/auth' 
import Notification from "../components/notification/notification"

const handleAuth = async (data) =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ state,dispatch] = useStore()
    dispatch(state,LOADING)
    const response = await loginApi(data)
    if(response.success){
        console.log(response)
        dispatch(state,SET_LOGIN_SUCCESS)
        Notification("success","Login Success")
        
    }else{
        dispatch(state,SET_LOGIN_FAIL)
        Notification('error','Login Fail')
    }
    console.log(state)
}

const handleGetProducts = async () =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ state,dispatch] = useStore()
    
}

export {handleAuth}