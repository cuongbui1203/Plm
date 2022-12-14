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

import { CSSX } from "./page/Thongke/CSSX";
import Loading from "./page/loading";
import ProductLine from "./page/productLine/ProductLine";
import { ProductLineDetail } from "./page/productLine/ProductLineDetail";
import Users from "./page/users/Users";
import { DLPP } from "./page/Thongke/DLPP";
import { TTBH } from "./auth/Role";
import { TTBHPage } from "./page/Thongke/TTBH";
import WorkPlates from "./page/workPlate/WorkPlates";
import CR from "./components/createRequest/CR";
import TabE from "./page/Thongke/Tab";
import { WorkPlatesDetail } from "./page/workPlate/WorkPlateDetail";
import TabRQ from "./page/RQ/tab";

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
    <>
      <Routes>
        <Route exact path="/login" element={<Authenticator />}>
          <Route path="/login" element={<LoginForm />} />
        </Route>
        <Route exact path="/" element={<RequiredAuth />}>
          <Route path="/home/profile/:id" element={<Profile />} />
          <Route path="/home/products" element={<Product />} />
          <Route path="/home/product/:id" element={<ProductDetail />} />
          <Route path="/home/statistical" element={<TabE />} />
          <Route path="/shop/statistical" element={<DLPP />} />
          <Route path="/bao-hanh/statistical" element={<TTBHPage />} />
          <Route path="/factory/statistical" element={<CSSX />} />
          <Route path="/home/product-lines" element={<ProductLine />} />
          <Route path="/home/work-plate" element={<WorkPlates />} />
          <Route
            path="/home/product-lines/:id/"
            element={<ProductLineDetail />}
          />
          <Route path="/home/users" element={<Users />} />
          <Route path="/home/request" element={<TabRQ />} />
          <Route path="/home/work-plate/:id" element={<WorkPlatesDetail />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
    // <Loading />
    // <img src={path} />
    // <CR />
  );
}

export default App;
