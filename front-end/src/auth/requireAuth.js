/* eslint-disable no-unused-vars */
import { Outlet, Navigate } from "react-router-dom";
import Loading from "../page/loading";
import { useLoginContext, useSettingContext } from "../state/hook/hooks";
function RequiredAuth() {
  const [state, updateSettingState] = useSettingContext();
  const [loginState, updateLoginState] = useLoginContext();
  const { isLoading } = state;

  if (isLoading) {
    return <Loading show="yes" />;
  }
  return <>{loginState.isLogin ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default RequiredAuth;
