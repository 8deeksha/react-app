import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import ProductView from "./pages/ProductView";

function App() {
  return (
   <div className="conatiner">
    <BrowserRouter>
      <Routes>
        <Route index element={<DashBoard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductView />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
   </div>
  );
}


export default App;
