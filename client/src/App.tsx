import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductSignup from "./pages/ProductSignup";
import Home from "./pages/Home";
function App() {
  return (
    
      <Routes>
        <Route path="/" element={<ProductSignup />} />
        <Route path="/home" element={<Home/>} />
      </Routes>
   
  );
}

export default App;
