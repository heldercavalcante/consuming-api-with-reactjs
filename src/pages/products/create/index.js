import { useState } from 'react'
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './create.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'

function CreateProduct() {

  const [product, setProduct] = useState({
    name:null,
    details:null,
    price:null,
    available:null,
    user_id:null
  });


  let navigate = useNavigate();

  async function createProducts() {
      await axios.post('http://localhost:8000/products', product,
    navigate("/products")
    )  
  }

  return (
    <div className='create'>
      <h1>Welcome to the Create Product Page</h1>
      <span>Enter the information of the product you want to create</span>
      <div className="container-input">
        <label className="form-label" htmlFor="name">Name:</label>
        <input className="form-control" type="text" value={product.name} id="name" onChange={ (e) => setProduct({...product,name:e.target.value}) }/>
        <label className="form-label" htmlFor="details">Details:</label>
        <input className="form-control" type="text" value={product.details} id="details" onChange={ (e) => setProduct({...product,details:e.target.value}) }/>
        <label className="form-label" htmlFor="price">Price:</label>
        <input className="form-control" type="text" value={product.price} id="price" onChange={ (e) => setProduct({...product,price:e.target.value}) }/>
        <label className="form-label" htmlFor="available">Available:</label>
        <input className="form-control" type="text" value={product.available} id="available" onChange={ (e) => setProduct({...product,available:e.target.value}) }/>
        <label className="form-label" htmlFor="user-id">User id:</label>
        <input className="form-control" type="text" value={product.user_id} id="user-id" onChange={ (e) => setProduct({...product,user_id:e.target.value}) }/>
      </div>
      <div className="container-button">
        <Button className="submit" onClick={createProducts}>submit</Button>
        <Link to="/products">
          <Button>Cancel</Button>
        </Link>
      </div>
    </div>
  )
}

export default CreateProduct;