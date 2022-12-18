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
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./security/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <div className="bg-black-scene">
        <BrowserRouter>

          <div className="w-full ">
              <Routes>
                <Route element={<ProtectedRoute />} >
                  <Route path="/Dashboard/Home" element={<Home />} />
                  <Route path="/Dashboard/Perfil" element={<Perfil />} />
                  <Route path="/Dashboard/Templates" element={<Plantillas />} />

                  <Route path="/Dashboard/Tarjetas" element={<Tarjetas />} />
                  <Route path="/Dashboard/Tarjetas/Settings" element={<Settings />} />
                  <Route path="/Dashboard/CreateCard" element={<CreateCard />} />
                  <Route path="/Dashboard/Historial" element={<Transferencias />} />  

                  <Route path="/Dashboard/*" element={ <NotFoundDashboard /> } />
                </Route>
                
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
          </div>
          
        </BrowserRouter>
      </div>

    </div>

  )
}

export default App;
