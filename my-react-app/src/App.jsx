// App.jsx
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import ProtectedRoute from './ProtectedRoute'
import Cart from './Shopping_Cart/Cart'
import StudentManager from './Student_CRUD/StudentManager'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // dummy flag, not real auth

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