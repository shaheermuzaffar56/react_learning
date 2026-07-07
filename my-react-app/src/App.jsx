
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import Cart from './features/products/Cart'
import StudentManager from './features/students/StudentManager'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Cart />} />
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="students" element={<StudentManager />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;