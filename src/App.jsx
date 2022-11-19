import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';

import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Tarjetas from "./pages/Card/Tarjetas";
import CreateCard from "./pages/Card/CreateCard";
import Settings from "./pages/Card/Settings";
import Plantillas from "./pages/Plantillas";
import Notfound from "./pages/Notfound";
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
                  <Route path="/Dashboard/settings" element={<Settings />} />
                  <Route path="/Dashboard/createCard" element={<CreateCard />} />

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
