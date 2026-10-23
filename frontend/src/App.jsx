import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin, { AdminPageGuard } from './pages/admin'
import Login from './pages/login'
import Home from './pages/home';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminProducts from "./pages/AdminFOL/AdminProducts";
import Images from "./pages/images"
import AdminAddProduct from "./pages/AdminFOL/adminAddProduct";
import AdminUpdateProduct from "./pages/AdminFOL/updateProduct";
import ProductPage from './pages/products';
import Collections from './pages/collections';
import About from './pages/about';
import Contact from './pages/contact';
import Overview from './pages/overview';
import Cart from './pages/cart';
import CheckOut from './pages/checkout';
import { Toaster } from "react-hot-toast";
import AdminOrders from './pages/AdminFOL/adminOrders';

import { useLocation } from "react-router-dom";

function App() {
  return (
    
    <BrowserRouter>

    <ToastContainer
    position="top-right"
    autoClose={2000}
/>
        <Toaster position="top-right" />

      <Routes>

        {/* ✅ Home Layout */}
        <Route 
          path="/" element={<Home/>}
        />

        {/* ✅ Login separate page */}
        <Route path="/login" element={<Login />} />
        <Route element={<AdminPageGuard />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/customers" element={<h1>Customers</h1>} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/add-product" element={<AdminAddProduct />} />
          <Route path="/admin/update-product/:id" element={<AdminUpdateProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>

        <Route path="/images" element={<Images />} />
        

        {/* ✅ Contact (optional same as home layout) */}
        <Route 
          path="/contact" 
          element={
            <div className="w-full h-[100vh] bg-red-500">
              <h2>Contact</h2>
            </div>
          } 
        />

        <Route path="/products" element={<ProductPage />} />

        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/overview/:id" element={<Overview />} />
        <Route path="/cart" element={<Cart />} />
         <Route path="/checkout" element={<CheckOut />} />
        

         
  </Routes>


</BrowserRouter>



  );
}

export default App;