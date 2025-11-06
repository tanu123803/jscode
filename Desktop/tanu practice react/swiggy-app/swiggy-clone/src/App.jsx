import {Routes,Route} from "react-router-dom"

import Signup from "./components/signup";
import Home from "./components/home";
import Login from "./components/login";
import Navbar from "./components/Navabar";



function App() {
  return (
    <>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Signup/>} /> 
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home/>} />
         

        </Routes>
      </div>
    </>
  )
}

export default App;
