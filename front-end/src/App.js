import "./App.css";
import Product from "./page/product/Product";
import LoginForm from "./components/loginForm/LoginForm";
import AdvancedExample from "./page/product/Pagination";
import { Routes, Route } from "react-router-dom";
import Authenticator from "./auth/Authenticator";
import RequiredAuth from "./auth/requireAuth";
import { SideBar, HeaderBar } from "./layout";
import RegisterForm from "./components/registerForm/registerForm";
import Admin from "./components/Admin/Admin";
import Shop from "./components/Shop/Shop";
import CR from "./components/createRequest/CR";
import { useLoginContext, useSettingContext } from "./state/hook/hooks";
import { getUserApi } from "./API/auth";
import { useEffect } from "react";
import { setLoaded, setLoading } from "./state/actions/settingActions";
import { setLoginSuccess } from "./state/actions/loginActions";
import User from "./page/home/user";
import { handleGetImage, handleGetUrlImage } from "./hook/getInformation";

function App() {
  const [loginState, loginHandle] = useLoginContext();
  const [setting, settingHandle] = useSettingContext();
  const getUser = async () => {
    let token = localStorage.getItem("token");
    if (token != null && !loginState.isLogin) {
      settingHandle(setLoading());
      const response = await getUserApi();
      if (response.success) {
        console.log(response);
        loginHandle(setLoginSuccess(token, response.data[0]));
      }
      settingHandle(setLoaded());
    }
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Routes>
      <Route exact path="/login" element={<Authenticator />}>
        <Route path="/login" element={<LoginForm />} />
      </Route>
      <Route exact path="/" element={<RequiredAuth />}>
        <Route
          path="/home"
          element={<User user={loginState.user} image={handleGetUrlImage(1)} />}
        />
      </Route>
    </Routes>
    // <div>
    // <div>
    //     <HeaderBar />
    //   </div>
    // <div>
    //   <div>
    // <SideBar />
    //   </div>
    //   <div>
    //     <Product />
    //   </div>
    // </div>
    // <Admin />
    // <Shop />
    // <RegisterForm />
    // <CR />
    // <LoginForm />
  );
}

export default App;
