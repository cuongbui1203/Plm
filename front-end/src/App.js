import './App.css';
import Product from './page/product/Product';
import LoginForm from './components/loginForm/LoginForm';
import { useStore } from './store';

import { Routes, Route } from "react-router-dom";
import Authenticator from './auth/Authenticator';
import RequiredAuth from './auth/requireAuth';
import { Spinner } from 'react-bootstrap';
import Loading from './page/loading';
import HashLoader from "react-spinners/HashLoader";
function App() {
  const [state,dispatch] = useStore()
  console.log(state)
  
  return ( 
    <>
      <Routes>
        <Route path="/" element={<Authenticator />} > 
          <Route path="/" element={<LoginForm />} />
        </Route>
        <Route path="/" element={<RequiredAuth />}> 
          <Route path="/home" element={<Product />} />
        </Route>
          {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </>
  );
}

export default App;
