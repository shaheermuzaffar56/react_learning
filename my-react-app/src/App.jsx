
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import ProductsPage from './features/products/ProductsPage'
import StudentManager from './features/students/StudentManager'
import ProductDetail from './features/products/Product_detail'
import AdminManager from './features/admin/AdminManager'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProductsPage />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="admin" element={<AdminManager />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;