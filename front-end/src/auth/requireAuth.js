import { Outlet,Navigate } from "react-router-dom"
import { useStore } from "../store"

function RequiredAuth() {
    const [state, dispatch] = useStore()
    const {isLogin,isLoading} = state


    if(isLoading){
        return <></>
    }
    return <>{isLogin ? <Outlet />:<Navigate to="/" /> }</>
}

export default RequiredAuth