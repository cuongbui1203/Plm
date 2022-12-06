import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "../page/loading";
import { useStore } from "../store";

function Authenticator(){
    const location = useLocation()
    console.log('Auth')
    const [state,dispatch] = useStore()
    const {isLogin,isLoading} = state
    let body;
    if(isLoading){
        body = <Loading show='yes' />
    }else if(isLogin){
        // navigation('/home')
        console.log(state)
        body = <Navigate to='/home' state={{ from: location } } replace />
    }else{
        body = <Outlet />
    }

    return <>{body}</>
}

export default Authenticator