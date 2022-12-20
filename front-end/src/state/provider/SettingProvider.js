import { useReducer } from "react";
import SettingContext from "../context/SettingContext";
import updateSettingState, {
  initState as initSettingState,
} from "../reducer/SettingReducer";

const SettingProvider = ({ children }) => {
  const [setting, handleSetting] = useReducer(
    updateSettingState,
    initSettingState
  );
  return (
    <SettingContext.Provider value={[setting, handleSetting]}>
      {children}
    </SettingContext.Provider>
  );
};

export default SettingProvider;
