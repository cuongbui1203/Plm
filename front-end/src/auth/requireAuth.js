import { Outlet,Navigate } from "react-router-dom"
import Loading from "../page/loading"
import { useStore } from "../store"

function RequiredAuth() {
    const [state, dispatch] = useStore()
    const {isLogin,isLoading} = state


    if(isLoading){
        return <Loading show='yes' />
    }
    return <>{isLogin ? <Outlet />:<Navigate to="/" /> }</>
}

export default RequiredAuth