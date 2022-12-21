import {
  SET_LOGIN_FAIL,
  SET_LOGIN_SUCCESS,
  SET_LOGOUT_FAIL,
  SET_LOGOUT_SUCCESS,
} from "../constants";

const setLoginSuccess = (token, user) => {
  localStorage.setItem("token", token);
  console.log(token);
  console.log(user);
  return {
    type: SET_LOGIN_SUCCESS,
    user: user,
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
