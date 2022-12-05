import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Product from "../page/product/Product";
import { useStore } from "../store";

function Authenticator(){
    const navigation = useNavigate()
    const location = useLocation()
    console.log('Auth')
    const [state,dispatch] = useStore()
    const {isLogin,isLoading} = state
    let body;
    if(isLoading){
        body = <></>
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