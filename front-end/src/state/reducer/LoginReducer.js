import {
  SET_LOGIN_FAIL,
  SET_LOGIN_SUCCESS,
  SET_LOGOUT_FAIL,
  SET_LOGOUT_SUCCESS,
} from "../constants";

const initState = {
  isLogin: false,
  user: null,
};

let updateLoginState = (state, action) => {
  switch (action.type) {
    case SET_LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        token: action.token,
        user: action.user,
      };
    case SET_LOGIN_FAIL:
    case SET_LOGOUT_SUCCESS:
      return {
        ...initState,
      };

    case SET_LOGOUT_FAIL:
      return {
        ...state,
      };
    default:
      throw new Error("Invalid Action");
  }
};

export { initState };
export default updateLoginState;
