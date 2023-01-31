import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';

import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Tarjetas from "./pages/Card/Tarjetas";
import CreateCard from "./pages/Card/CreateCard";
import Settings from "./pages/Card/Settings";
import Transferencias from "./pages/Card/Transferencias";
import Plantillas from "./pages/Plantillas";
import NotFoundDashboard from "./pages/NotFoundDashboard";
import ProtectedRoute from "./security/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Blog from "./pages/Blog";
import SettingsDash from "./pages/Settings";
import Lendings from "./pages/DashBoard/Lendings";
import NotFound from "./pages/NotFound";

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
                <Route path="/Dashboard/Templates" element={<Plantillas />} />
                <Route path="/Dashboard/Prestamos" element={<Lendings />} />

                <Route path="/Dashboard/Tarjetas" element={<Tarjetas />} />
                <Route path="/Dashboard/Tarjetas/Settings" element={<Settings />} />
                <Route path="/Dashboard/Tarjetas/Transferencias" element={<Transferencias />} />
                <Route path="/Dashboard/CreateCard" element={<CreateCard />} />
                <Route path="/Dashboard/Settings" element={<SettingsDash />} />

                <Route path="/Dashboard/*" element={<NotFoundDashboard />} />
              </Route>

              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Home" element={<HomePage />} />
              <Route path="/Blog" element={<Blog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

        </BrowserRouter>
      </div>

    </div>

  )
}

export default App;
