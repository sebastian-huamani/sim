import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';

import Plantillas from "./pages/DashBoard/Plantillas";
import SettingsDash from "./pages/DashBoard/Settings";
import Lendings from "./pages/DashBoard/Lendings";
import Perfil from "./pages/DashBoard/Perfil";
import Home from "./pages/DashBoard/Home";

import Tarjetas from "./pages/DashBoard/Card/Tarjetas";
import CreateCard from "./pages/DashBoard/Card/CreateCard";
import Settings from "./pages/DashBoard/Card/Settings";
import Transferencias from "./pages/DashBoard/Card/Transferencias";
import NotFoundDashboard from "./pages/DashBoard/NotFoundDashboard";
import ProtectedRoute from "./security/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Home";
import Blog from "./pages/Blog";
import NotfoundPage from "./pages/NotfoundPage";
import BlogA from "./pages/Blogs/BlogA";

function App() {
  return (
    <div className="App">
      <div className="bg-black-scene">
        <BrowserRouter>

          <div className="w-full font-Josefin">
            <Routes>
              <Route element={<ProtectedRoute />} >
                <Route path="/Dashboard/Home" element={<Home />} />
                <Route path="/Dashboard/Perfil" element={<Perfil />} />
                <Route path="/Dashboard/Plantilla" element={<Plantillas />} />
                <Route path="/Dashboard/Prestamos" element={<Lendings />} />

                <Route path="/Dashboard/Tarjetas" element={<Tarjetas />} />
                <Route path="/Dashboard/Tarjetas/Configuracion" element={<Settings />} />
                <Route path="/Dashboard/Tarjetas/Transferencias" element={<Transferencias />} />
                <Route path="/Dashboard/Crear-Nueva-Tarjeta" element={<CreateCard />} />
                <Route path="/Dashboard/Configuracion" element={<SettingsDash />} />

                <Route path="/Dashboard/Blogs" element={<Blog />} />

                <Route path="/Dashboard/*" element={<Home />} />
              </Route>

              <Route path="/Login" element={<Login />} />
              <Route path="*" element={<Home />} />
              <Route path="/Register" element={<Register />} />
              {/* <Route path="/Home" element={<HomePage />} />
              <Route path="/Blog" element={<Blog />} />
              <Route path="/Blog/Categorias" element={<BlogA />} />
              <Route path="*" element={<Home />} /> */}
            </Routes>
          </div>

        </BrowserRouter>
      </div>

    </div>

  )
}

export default App;
