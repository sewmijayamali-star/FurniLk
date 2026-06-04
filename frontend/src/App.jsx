import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './pages/admin'
import Login from './pages/login'
import Home from './pages/home';
import { Toaster } from 'react-hot-toast';
import AdminProducts from "./pages/AdminFOL/AdminProducts";
import Images from "./pages/images"
import AdminAddProduct from "./pages/AdminFOL/adminAddProduct";
import AdminUpdateProduct from "./pages/AdminFOL/updateProduct";
import ProductPage from './pages/products';
import Collections from './pages/collections';
import About from './pages/about';
import Contact from './pages/contact';
import Overview from './pages/overview';

function App() {
  return (
    <BrowserRouter>

    <Toaster  position="top-right"/>

      <Routes>

        {/* ✅ Home Layout */}
        <Route 
          path="/" element={<Home/>}
        />

        {/* ✅ Login separate page */}
        <Route path="/login" element={<Login />} />
         <Route path="/admin" element={<Admin />} />
           
        <Route path="/admin/orders" element={<h1 >Orders</h1> } />
        <Route path="/admin/customers" element={<h1 >Customers</h1> } />

      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/add-product" element={<AdminAddProduct />} />
      <Route path="/admin/update-product/:id" element={<AdminUpdateProduct />} />
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

         
  </Routes>


</BrowserRouter>



  );
}

export default App;