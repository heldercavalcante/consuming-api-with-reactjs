import { useState } from 'react'
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './create.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'

function CreateProduct() {

  const [name, setName] = useState();
  const [details, setDetails] = useState();
  const [price, setPrice] = useState();
  const [available, setAvailable] = useState();
  const [size, setSize] = useState();
  const [user_id, setUserId] = useState();
  let navigate = useNavigate();

  async function createProducts() {
      await axios.post('http://localhost:8000/products', {
      name: name,
      details: details,
      price: price,
      available: available,
      size: size,
      user_id: user_id
    },
    navigate("/products"),
    alert('Product Created Successfully'),
    window.location.reload() 
    )  
  }

  return (
    <div className='create'>
      <h1>Welcome to the Create Product Page</h1>
      <span>Enter the information of the product you want to create</span>
      <div className="container-input">
        <label className="form-label" htmlFor="name">Name:</label>
        <input className="form-control" type="text" value={name} id="name" onChange={ (e) => setName(e.target.value) }/>
        <label className="form-label" htmlFor="details">Details:</label>
        <input className="form-control" type="text" value={details} id="details" onChange={ (e) => setDetails(e.target.value) }/>
        <label className="form-label" htmlFor="price">Price:</label>
        <input className="form-control" type="text" value={price} id="price" onChange={ (e) => setPrice(e.target.value) }/>
        <label className="form-label" htmlFor="available">Available:</label>
        <input className="form-control" type="text" value={available} id="available" onChange={ (e) => setAvailable(e.target.value) }/>
        <label className="form-label" htmlFor="size">Size:</label>
        <input className="form-control" type="text" value={size} id="size" onChange={ (e) => setSize(e.target.value) }/>
        <label className="form-label" htmlFor="user-id">User id:</label>
        <input className="form-control" type="text" value={user_id} id="user-id" onChange={ (e) => setUserId(e.target.value) }/>
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