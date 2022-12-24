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
import { useEffect, useState } from "react";
import { setLoaded, setLoading } from "./state/actions/settingActions";
import { setLoginSuccess } from "./state/actions/loginActions";
import User from "./page/home/user";
import { handleGetUrlImage } from "./hook/getInformation";
import { getRoleId } from "./API/Other";
import { Container } from "react-bootstrap";
import NotFound from "./page/error/404";

function App() {
  const [loginState, loginHandle] = useLoginContext();
  const [setting, settingHandle] = useSettingContext();
  const [urlImage, urlImageHandle] = useState("");
  const [roleTitle, updateRoleTitle] = useState("");
  const getUser = async () => {
    let token = localStorage.getItem("token");
    if (token !== null && !loginState.isLogin) {
      settingHandle(setLoading());
      const response = await getUserApi();
      if (response.success) {
        let response2 = await getRoleId(response.data[0].roleId);
        response.data[0].role = response2.data[0].title;
        loginHandle(setLoginSuccess(token, response.data[0]));
      }
      settingHandle(setLoaded());
    }
  };
  useEffect(() => {
    getUser();
    console.log(loginState);
    urlImageHandle(
      loginState.isLogin
        ? handleGetUrlImage(loginState.user.imageId)
        : "https://i.pinimg.com/564x/62/ed/6e/62ed6ea71018a57a3ab0c8c959d78cb0.jpg"
    );
    updateRoleTitle(loginState.isLogin ? loginState.user.role : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginState]);
  return (
    <>
      <HeaderBar role={roleTitle} />
      {/* <SideBar /> */}
      <Container className="content">
        <Routes>
          <Route exact path="/login" element={<Authenticator />}>
            <Route path="/login" element={<LoginForm />} />
          </Route>
          <Route exact path="/" element={<RequiredAuth />}>
            <Route
              path="/home/"
              element={<User user={loginState.user} image={urlImage} />}
            />
            <Route path="/product" element={<Product />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
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
