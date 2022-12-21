import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "../page/loading";
import { useLoginContext, useSettingContext } from "../state/hook/hooks";

function Authenticator() {
  const location = useLocation();
  console.log("Auth");
  const [setting, updateSettingState] = useSettingContext();
  const [loginState, updateLoginState] = useLoginContext();
  const { isLoading } = setting;
  let body;
  if (isLoading) {
    body = <Loading show={true} />;
  } else if (loginState.isLogin) {
    // navigation('/home')
    console.log(setting);
    body = <Navigate to="/home" state={{ from: location }} replace />;
  } else {
    body = <Outlet />;
  }

  return <>{body}</>;
}

export default Authenticator;
