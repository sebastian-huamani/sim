import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';

import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Tarjetas from "./pages/Card/Tarjetas";
import CreateCard from "./pages/Card/CreateCard";
import Settings from "./pages/Card/Settings";
import Transferencias from "./pages/Card/Transferencias";
import Transaccion from "./pages/Card/Transaccion";
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
                  <Route path="/Dashboard/home" element={<Home />} />
                  <Route path="/Dashboard/perfil" element={<Perfil />} />
                  <Route path="/Dashboard/templates" element={<Plantillas />} />

                  <Route path="/Dashboard/tarjetas" element={<Tarjetas />} />
                  <Route path="/Dashboard/Tarjetas/Settings" element={<Settings />} />
                  <Route path="/Dashboard/createCard" element={<CreateCard />} />
                  <Route path="/Dashboard/Tarjetas/Transferencias" element={<Transferencias />} />
                  <Route path="/Dashboard/Tarjetas/NuevaTransaccion" element={<Transaccion />} />

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
