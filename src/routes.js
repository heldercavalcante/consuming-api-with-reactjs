import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Product from './pages/products/list/'
import CreateProduct from './pages/products/create'
import UpdateProduct from './pages/products/update'


function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<Product/>}/>
        <Route path="/products/create" element={<CreateProduct/>}/>
        <Route path="products/update/:id" element={<UpdateProduct/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp;