import { useReducer } from "react";
import LoginContext from "../context/LoginContext";
import updateLoginState, {
  initState as initLoginState,
} from "../reducer/LoginReducer";

function LoginProvider({ children }) {
  const [login, loginHandle] = useReducer(updateLoginState, initLoginState);
  return (
    <LoginContext.Provider value={[login, loginHandle]}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
