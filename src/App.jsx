import Header from "./components/layouts/Header/Header";
import Sidebar from "./components/layouts/sidebar/Sidebar";
import Home from "./Views/Home";
import Homeacc from "./Views/Homeacceuil";

//akrem
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Navbar from "./components/AkremComponents/Navbar";
import NotFound from "./pages/NotFound";
import NoAccess from "./pages/NoAccess";
import PrivateRouter from "./components/AkremComponents/PrivateRouter";
import AdminRouter from "./components/AkremComponents/AdminRouter";
import ForceRedirect from "./components/AkremComponents/ForceRedirect";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import { Logout, setUser } from "./redux/actions/authActions";
import { useSelector } from "react-redux";
import { setAuth } from "./util/setAuth";
import Events from "../src/pages/Home"


if (window.localStorage.jwt) {
  const decode = jwt_decode(window.localStorage.jwt);
  store.dispatch(setUser(decode));
  setAuth(window.localStorage.jwt);
  const currentDate = Date.now / 1000;

  if (decode.exp > currentDate) {
    store.dispatch(Logout());
  }
}

function App() {
  const auth = useSelector((state) => state.auth);
  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role,
  };
  return (
    <div className="App">
      <BrowserRouter>
        <div className="bg-light" style={{ height: "100vh" }}>
          <Navbar user={user} />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/home"
              element={
                <PrivateRouter user={user}>
                  <Sidebar />
                  <Homeacc />
                 
                  
                </PrivateRouter>
              }
            />

            <Route
              path="/profil"
              element={
                <PrivateRouter user={user}>
                  <Profile />
                </PrivateRouter>
              }
            />
            <Route
              path="/login"
              element={
                <ForceRedirect user={user}>
                  <Login />
                </ForceRedirect>
              }
            />

            <Route
              path="/register"
              element={
                <ForceRedirect user={user}>
                  <Register />
                </ForceRedirect>
              }
            />



<Route
              path="/ADDEvent"
              element={
                <PrivateRouter user={user}>
                 <Events/>
                </PrivateRouter>
              }
            />





            <Route
              path="/admin"
              element={
                <AdminRouter user={user}>
                  <Admin />
                </AdminRouter>
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route path="/noaccess" element={<NoAccess />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
