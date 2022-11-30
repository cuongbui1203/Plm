import './App.css';
import HeaderBar from './components/HeaderBar';
import SideBar from './components/SideBar';
import Product from './components/Product';
import Login from './login/Login';

function App() {
  return (
    <div>
      {/* <Login /> */}
      <div>

      <HeaderBar />
      </div>
      <div>
      <SideBar />

      </div>
      <div>
      <Product />

      </div>


    </div>
  );
}

export default App;
