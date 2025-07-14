
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";

function App() {
  return (
    <main>
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/> } />
      </Routes>
    </main>
    
  )
}
export default App;
