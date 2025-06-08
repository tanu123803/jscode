import { Route, Routes } from "react-router-dom"
import SignUp from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login";
function App() {
  

  return (
    <>
      
      <Routes>
        
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/home" element={<Home/>}/>
        
      </Routes>
    </>
  )
}

export default App
