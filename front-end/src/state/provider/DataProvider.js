import { useReducer } from "react";
import DataContext from "../context/DataContext";
import UpdateDataState, {
  initState as initDataState,
} from "../reducer/DataReducer";

const DataProvider = ({ children }) => {
  const [data, dataHandle] = useReducer(UpdateDataState, initDataState);
  return (
    <DataContext.Provider value={[data, dataHandle]}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
