import { useState } from 'react'
import './App.css'
import {products} from './data'
import Card from './Card'



function App() {
 return (
    <div className="container">
      <h1 className="text-center my-4">Product List</h1>

      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
            <Card name={product.name} price={product.price} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
