import Layout from "./Components/Layout/Layout.tsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard.tsx";
import Restaurants from "./Pages/Restaurants/Restaurants.tsx";
// @ts-ignore
import Restaurant from "./Pages/Restaurants/Restaurant.tsx";
import RightSideBar from "./Components/Layout/RightSideBar.tsx";
import Checkout from "./Pages/Checkout/Checkout.tsx";
import OrderTracking from "./Pages/OrderTracking/OrderTracking.tsx";
import Login from "./Pages/Auth/Login.tsx";
import Register from "./Pages/Auth/Register.tsx";
import Profile from "./Pages/Profile/Profile.tsx";
import ProfileEdit from "./Pages/Profile/ProfileEdit.tsx";
import ChangePassword from "./Pages/Profile/ChangePassword.tsx";
import Category from "./Pages/Category/Category.tsx";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/" element={<Layout><Dashboard /></Layout>} />
              <Route path="/category/:foodType" element={<Layout><Category /></Layout>} />
              <Route path="/restaurants" element={<Layout><Restaurants /></Layout>} />
              <Route path="/restaurants/:id" element={<Layout><Restaurant /></Layout>} />
              <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
              <Route path="/order-track/:orderId" element={<Layout><OrderTracking /></Layout>} />
              <Route path={"/profile"} element={<Layout><Profile/></Layout>} />
              <Route path={"/profile/edit"} element={<Layout><ProfileEdit/></Layout>} />
              <Route path={"/profile/change-password"} element={<Layout><ChangePassword/></Layout>} />
              <Route path="/cart" element={<RightSideBar />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
