import { getUserApi, loginApi } from "../API/auth";
import Notification from "../components/notification/notification";
import { setLoginFail, setLoginSuccess } from "../state/actions/loginActions";
import { setLoaded, setLoading } from "../state/actions/settingActions";
import { useLoginContext, useSettingContext } from "../state/hook/hooks";

const handleAuth = async (data) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loginState, updateLoginState] = useLoginContext();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [settingState, updateSettingState] = useSettingContext();
  //   dispatch(state, LOADING);
  updateSettingState(setLoading());
  const response = await loginApi(data);
  updateSettingState(setLoaded());
  if (response.success) {
    console.log(response);
    // dispatch(state, SET_LOGIN_SUCCESS);
    updateLoginState(setLoginSuccess(response.data.token, response.data.user));
    Notification("success", "Login Success");
  } else {
    // dispatch(state, SET_LOGIN_FAIL);
    updateLoginState(setLoginFail());
    Notification("error", "Login Fail");
  }
  console.log(loginState);
};

const handleGetProducts = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [settingState, updateSettingState] = useSettingContext();
  //   const []
};

export { handleAuth, handleGetProducts };
