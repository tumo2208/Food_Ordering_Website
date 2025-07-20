import Layout from "./Components/Layout/Layout.tsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard.tsx";
import Restaurants from "./Pages/Restaurants/Restaurants.tsx";
import Restaurant from "./Pages/Restaurants/Restaurant.tsx";
import RightSideBar from "./Components/Layout/RightSideBar.tsx";
import Checkout from "./Pages/Checkout/Checkout.tsx";
import OrderTracking from "./Pages/OrderTracking/OrderTracking.tsx";

function App() {
  return (
      <BrowserRouter>
          <Layout>
              <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/restaurants" element={<Restaurants />} />
                  <Route path="/restaurants/:id" element={<Restaurant />} />
                  <Route path='/checkout' element={<Checkout />} />
                  <Route path='/order-track/:orderId' element={<OrderTracking />} />
                  <Route path='/cart' element={<RightSideBar />} />
              </Routes>
          </Layout>
      </BrowserRouter>
  )
}

export default App
