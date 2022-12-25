import { useContext } from "react";
import DataContext from "../context/DataContext";
import LoginContext from "../context/LoginContext";
import ProductLineContext from "../context/ProductLinesContext";
import SettingContext from "../context/SettingContext";

const useSettingContext = () => {
  return useContext(SettingContext);
};

const useLoginContext = () => {
  return useContext(LoginContext);
};

const useDataContext = () => {
  return useContext(DataContext);
};

const useProductLinesContext = () => {
  return useContext(ProductLineContext);
};
export {
  useSettingContext,
  useLoginContext,
  useDataContext,
  useProductLinesContext,
};
