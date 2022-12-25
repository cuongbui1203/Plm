import DataProvider from "./DataProvider";
import LoginProvider from "./LoginProvider";
import ProductLinesProvider from "./ProductLinesProvider";
import SettingProvider from "./SettingProvider";

const AppProvider = ({ children }) => {
  return (
    <SettingProvider>
      <LoginProvider>
        <DataProvider>
          <ProductLinesProvider>{children}</ProductLinesProvider>
        </DataProvider>
      </LoginProvider>
    </SettingProvider>
  );
};

export default AppProvider;
