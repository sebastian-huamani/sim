import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Tarjetas from "./pages/Tarjetas";
import Plantillas from "./pages/Plantillas";
import Navtop from "./components/NavTop";

function App() {


  return (
    <div className="App">

      <div className="bg-black-scene">

        <BrowserRouter>

          <div className="nav-lateral">
            <Navbar />
          </div>

          <div className="inline-block md:hidden w-full" >
            <Navtop />
          </div>
          

          <div className="w-full md:pl-16 pl-0 ">
            <div className="p-2 h-screen ">
              <Routes>
                <Route path="/home" element={<Home />} />

                <Route path="/perfil" element={<Perfil />} />
                <Route path="/perfil/:id" element={<Perfil />} />

                <Route path="/templates" element={<Plantillas />} />
                <Route path="/tarjetas" element={<Tarjetas />} />
                <Route path="/logout" element={<div>logout </div>} />
                <Route path="*" element={<p>Not found</p>} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>

    </div>

  )
}

export default App
