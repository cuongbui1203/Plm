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

function App() {
  return (
    // <Routes>
    //   <Route exact path="/login" element={<Authenticator />}>
    //     <Route path="/login" element={<LoginForm />} />
    //   </Route>
    //   <Route exact path="/" element={<RequiredAuth />}>
    //     <Route path="/home" element={<Product />} />
    //   </Route>
    // </Routes>
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
    <Admin />
    // <Shop />
    // <RegisterForm />
    // <CR />
    // <LoginForm />
  );
}

export default App;
