import { handleGetUrlImage } from "../../hook/getInformation";
import {
  SET_LOGIN_FAIL,
  SET_LOGIN_SUCCESS,
  SET_LOGOUT_FAIL,
  SET_LOGOUT_SUCCESS,
} from "../constants";

const setLoginSuccess = async (token, user) => {
  localStorage.setItem("token", token);
  console.log(token);
  console.log(user);
  let url = await handleGetUrlImage(user.imageId);
  return {
    type: SET_LOGIN_SUCCESS,
    user: user,
    url: url,
  };
};

const setLoginFail = () => {
  return {
    type: SET_LOGIN_FAIL,
  };
};

const setLogoutSuccess = () => {
  return {
    type: SET_LOGOUT_SUCCESS,
  };
};

const setLogoutFail = () => {
  return {
    type: SET_LOGOUT_FAIL,
  };
};

export { setLoginFail, setLoginSuccess, setLogoutFail, setLogoutSuccess };
