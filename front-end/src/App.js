import './App.css';
import Product from './page/product/Product';
import LoginForm from './components/loginForm/LoginForm';

import { Routes, Route } from "react-router-dom";
import Authenticator from './auth/Authenticator';
import RequiredAuth from './auth/requireAuth';
function App() {
  return ( 
      <Routes>
        <Route exact path="/login" element={<Authenticator />} > 
          <Route path="/login" element={<LoginForm />} />
        </Route>
        <Route exact path="/" element={<RequiredAuth />}> 
          <Route path="/home" element={<Product />} />
        </Route>
      </Routes>
  );
}

export default App;
