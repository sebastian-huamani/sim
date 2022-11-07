import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import './App.css';
import Navbar from "./components/Navbar";
import Navtop from "./components/NavTop";
import NavIndex from "./components/NavIndex";

import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Tarjetas from "./pages/Tarjetas";
import Plantillas from "./pages/Plantillas";
import Notfound from "./pages/Notfound";
import ProtectedRoute from "./security/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";

let done = localStorage.getItem('done');
function App() {
  return (
    <div className="App">
      <div className="bg-black-scene">
        <BrowserRouter>

          <div className="w-full ">
              <Routes>
                <Route element={<ProtectedRoute />} >
                  <Route path="/Dashboard/home" element={<Home />} />
                  <Route path="/Dashboard/perfil" element={<Perfil />} />
                  <Route path="/Dashboard/templates" element={<Plantillas />} />
                  <Route path="/Dashboard/tarjetas" element={<Tarjetas />} />
                  <Route path="/Dashboard/logout" element={<Logout />} />
                  <Route path="/Dashboard/*" element={ <p> error</p> } />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Notfound />} />
              </Routes>
          </div>
          
        </BrowserRouter>
      </div>

    </div>

  )
}

export default App;
