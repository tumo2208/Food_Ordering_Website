import Layout from "./Components/Layout/Layout.tsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard.tsx";

function App() {
  return (
      <BrowserRouter>
          <Layout>
              <Routes>
                    <Route path="/" element={<Dashboard />} />
              </Routes>
          </Layout>
      </BrowserRouter>
  )
}

export default App
