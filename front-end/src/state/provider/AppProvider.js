import DataProvider from "./DataProvider";
import LoginProvider from "./LoginProvider";
import SettingProvider from "./SettingProvider";

const AppProvider = ({ children }) => {
  return (
    <SettingProvider>
      <LoginProvider>
        <DataProvider>{children}</DataProvider>
      </LoginProvider>
    </SettingProvider>
  );
};

export default AppProvider;
