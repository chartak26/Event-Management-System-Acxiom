 import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Vendor from "./pages/Vendor";
import User from "./pages/User";

export default function App(){
 return(
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/admin" element={<Admin/>}/>
    <Route path="/vendor" element={<Vendor/>}/>
    <Route path="/user" element={<User/>}/>
   </Routes>
  </BrowserRouter>
 );
}

