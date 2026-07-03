import { useState } from 'react'
import './App.css'
import StudentManager from './Student_CRUD/StudentManager'
import Cart from './Shopping_Cart/Cart'
import { products } from './Product_listing/data'


function App() {
 return (
        <div className="container">
            <h1 className="text-center my-4">Product List</h1>
            <Cart />
            <StudentManager />
        </div>
  );
}

export default App;
