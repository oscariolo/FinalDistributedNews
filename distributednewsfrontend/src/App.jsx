import Home from "./components/Home";
import Login from "./components/Login";
import Explorar from "./components/Explorar";
import Suscripciones from "./components/Suscripciones";
import Registrarse from "./components/Registrarse";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <main>
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/explorar" element={<Explorar />} />
        <Route path="/suscripciones" element={<Suscripciones />} />
        <Route path="/login" element={<Login/> } />
        <Route path="/registro" element={<Registrarse/> } />
      </Routes>
    </main>
    
  )
}
export default App;
