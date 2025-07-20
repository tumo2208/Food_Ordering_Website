import Layout from "./Components/Layout/Layout.tsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard.tsx";
import Restaurants from "./Pages/Restaurants/Restaurants.tsx";
import Restaurant from "./Pages/Restaurants/Restaurant.tsx";

function App() {
  return (
      <BrowserRouter>
          <Layout>
              <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/restaurants" element={<Restaurants />} />
                  <Route path="/restaurants/:id" element={<Restaurant />} />
              </Routes>
          </Layout>
      </BrowserRouter>
  )
}

export default App
