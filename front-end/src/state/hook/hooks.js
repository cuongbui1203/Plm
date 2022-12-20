import { useContext } from "react";
import LoginContext from "../context/LoginContext";
import SettingContext from "../context/SettingContext";

const useSettingContext = () => {
  return useContext(SettingContext);
};

const useLoginContext = () => {
  return useContext(LoginContext);
};

export { useSettingContext, useLoginContext };
