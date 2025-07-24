import Layout from "./Components/Layout/Layout.tsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard.tsx";
import Restaurants from "./Pages/Restaurants/Restaurants.tsx";
import Restaurant from "./Pages/Restaurants/Restaurant.tsx";
import RightSideBar from "./Components/Layout/RightSideBar.tsx";
import Checkout from "./Pages/Checkout/Checkout.tsx";
import OrderTracking from "./Pages/OrderTracking/OrderTracking.tsx";
import Login from "./Pages/Auth/Login.tsx";
import Register from "./Pages/Auth/Register.tsx";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/" element={<Layout><Dashboard /></Layout>} />
              <Route path="/restaurants" element={<Layout><Restaurants /></Layout>} />
              <Route path="/restaurants/:id" element={<Layout><Restaurant /></Layout>} />
              <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
              <Route path="/order-track/:orderId" element={<Layout><OrderTracking /></Layout>} />
              <Route path="/cart" element={<RightSideBar />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
