import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import './update.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'


function UpdateProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loadingProduct, setLoadingProduct] = useState(true);

  let navigate = useNavigate();

  async function loadProduct() {
    setLoadingProduct(true)
    const response = await axios.get(`http://localhost:8000/products/${id}`)
    setProduct(response.data)
    setLoadingProduct(false)
  }
  useEffect(() => {
    loadProduct()
    },[]);

  async function updateProduct() {
    await axios.put(`http://localhost:8000/products/${id}`, 
    product,
    navigate("/products")
   )  
}
  return (
    <div className='update'>
    {loadingProduct ? (
      <h1>Loading Products</h1>
    ) : (
      <div className='head'>
      <h1>Welcome to the Update Product Page</h1>
      <span>Enter the new information about the product</span>
      
      <div>   
        <label className="form-label" htmlFor="name">Name</label>
        <input className="form-control" type="text" value={product.name} id="name" onChange={ (e) => setProduct({...product,name:e.target.value}) }/>
        <label className="form-label" htmlFor="details">Details</label>
        <input className="form-control" type="text" value={product.details} id="details" onChange={ (e) => setProduct({...product,details:e.target.value}) }/>
        <label className="form-label" htmlFor="price">Price</label>
        <input className="form-control" type="text" value={product.price} id="price" onChange={ (e) => setProduct({...product,price:e.target.value}) }/>
        <label className="form-label" htmlFor="available">Available</label>
        <input className="form-control" type="text" value={product.available} id="available" onChange={ (e) => setProduct({...product,available:e.target.value}) }/>
        </div>
        <div className="container-button">
        <Button className="submit" onClick={updateProduct}>submit</Button>
        <Link to="/products">
          <Button>Cancel</Button>
        </Link>
      </div>
      </div>
    )}
    </div>
  )
}

export default UpdateProduct;