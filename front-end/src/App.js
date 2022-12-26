import "./App.css";
import Product from "./page/product/Product";
import LoginForm from "./components/loginForm/LoginForm";
import { Routes, Route } from "react-router-dom";
import Authenticator from "./auth/Authenticator";
import RequiredAuth from "./auth/requireAuth";
import { SideBar, HeaderBar } from "./layout";
import {
  useLoginContext,
  useProductLinesContext,
  useSettingContext,
} from "./state/hook/hooks";
import { getUserApi } from "./API/auth";
import { useEffect, useState } from "react";
import { setLoaded, setLoading } from "./state/actions/settingActions";
import { setLoginSuccess } from "./state/actions/loginActions";
import { handleGetUrlImage } from "./hook/getInformation";
import { getRoleId } from "./API/Other";
import { Container } from "react-bootstrap";
import NotFound from "./page/error/404";
import { ProductDetail } from "./page/product/ProductDetail";
import { Profile } from "./components/User/Profile";
import { ChangePass } from "./components/User/ChangePass";
import { ThongKe } from "./page/Thongke/ThongKe";

function App() {
  const [loginState, loginHandle] = useLoginContext();
  const [setting, settingHandle] = useSettingContext();
  const [urlImage, urlImageHandle] = useState("");
  const [roleTitle, updateRoleTitle] = useState("");
  const [productLines, updateProductLines] = useProductLinesContext();
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
    // <>
    //   <HeaderBar role={roleTitle} />
    //   {/* <SideBar /> */}
    //   <Container className="content">
    //     <Routes>
    //       <Route exact path="/login" element={<Authenticator />}>
    //         <Route path="/login" element={<LoginForm />} />
    //     </Route>
    //       <Route exact path="/" element={<RequiredAuth />}>
    //         <Route
    //           path="/home/"
    //           element={<User user={loginState.user} image={urlImage} />}
    //         />
    //         <Route path="/profile" element={<Profile />} />
    //         <Route path="/changePass" element={<ChangePass />} />
    //         <Route path="/product" element={<Product />} />
    //         <Route path="/productDetail" element={<ProductDetail />} />
    //       </Route>
    //     <Route path="/*" element={<NotFound />} />
    //     </Routes>
    //   </Container>
    // </>
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
    <ThongKe />
    // <>
    //   <Routes>
    //     <Route exact path="/login" element={<Authenticator />}>
    //       <Route path="/login" element={<LoginForm />} />
    //     </Route>
    //     <Route exact path="/" element={<RequiredAuth />}>
    //       <Route path="/home/profile/:id" element={<Profile />} />
    //       <Route path="/home/" element={<Product />} />
    //       <Route path="/home/product/:id" element={<ProductDetail />} />
    //     </Route>
    //     <Route path="/*" element={<NotFound />} />
    //   </Routes>
    // </>
    // <img src={path} />
  );
}

export default App;
