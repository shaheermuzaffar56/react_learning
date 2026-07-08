
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import ProductsPage from './features/products/ProductsPage'
import StudentManager from './features/students/StudentManager'
import ProductDetail from './features/products/Product_detail'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProductsPage />} />s
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="students" element={<StudentManager />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;