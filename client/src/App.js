
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ItemPage from "./pages/ItemPage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
  <>
  <BrowserRouter> 
   <Routes>
    <Route path="/" element={<Homepage/>} />
    <Route path="/items" element={<ItemPage/>} />
    <Route path="/cart" element={<CartPage/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
   </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
