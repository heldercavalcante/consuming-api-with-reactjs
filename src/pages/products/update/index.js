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

  const [name, setName] = useState();
  const [details, setDetails] = useState();
  const [price, setPrice] = useState();
  const [available, setAvailable] = useState();
  const [size, setSize] = useState();
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

  //console.log(products)
  console.log(product)
  
  useEffect(() => {
    if (!loadingProduct) {
      setName(product.name)
      setDetails(product.details)
      setPrice(product.price)
      setAvailable(product.available)
      setSize(product.size)
    }
  },[product])


  async function updateProducts() {
    await axios.put(`http://localhost:8000/products/${id}`, {
    name: name,
    details: details,
    price: price,
    available: available,
    size: size,
  },
  navigate("/products"),
  alert('Product Successfully Updated'),
  window.location.reload()
   )  
}
  return (
    <div className='update'>
    {loadingProduct ? (
      <h1>Carregando Produtos</h1>
    ) : (
      <div className='head'>
      <h1>Welcome to the Update Product Page</h1>
      <span>Enter the new information about the product</span>
      
      <div>   
        <label className="form-label" htmlFor="name">Name</label>
        <input className="form-control" type="text" value={name} id="name" onChange={ (e) => setName(e.target.value) }/>
        <label className="form-label" htmlFor="details">Details</label>
        <input className="form-control" type="text" value={details} id="details" onChange={ (e) => setDetails(e.target.value) }/>
        <label className="form-label" htmlFor="price">Price</label>
        <input className="form-control" type="text" value={price} id="price" onChange={ (e) => setPrice(e.target.value) }/>
        <label className="form-label" htmlFor="available">Available</label>
        <input className="form-control" type="text" value={available} id="available" onChange={ (e) => setAvailable(e.target.value) }/>
        <label className="form-label" htmlFor="size">Size</label>
        <input className="form-control" type="text" value={size} id="size" onChange={ (e) => setSize(e.target.value) }/>
        </div>
        <div className="container-button">
        <Button className="submit" onClick={updateProducts}>submit</Button>
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