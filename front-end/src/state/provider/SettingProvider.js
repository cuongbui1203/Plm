import { useReducer } from "react";
import { getUserApi } from "../../API/auth";
import SettingContext from "../context/SettingContext";
import { useLoginContext } from "../hook/hooks";
import updateSettingState, {
  initState as initSettingState,
} from "../reducer/SettingReducer";

const SettingProvider = ({ children }) => {
  const [setting, handleSetting] = useReducer(
    updateSettingState,
    initSettingState
  );
  // const [loginState, updateLoginState] = useLoginContext();
  if (localStorage.getItem("token")) {
    // let response = await getUserApi();
    // if (response.success) {
    //   // updateLoginState();
    // }
  }

  return (
    <SettingContext.Provider value={[setting, handleSetting]}>
      {children}
    </SettingContext.Provider>
  );
};

export default SettingProvider;
