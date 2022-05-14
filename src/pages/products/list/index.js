
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import './list.css';
import { FiTrash } from 'react-icons/fi'
import { BsPlus } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";


function Product() {
  console.log('1 - iniciou o componente')

  //useState é utilizado para renderizar a tela de acordo com as mudanças do estado da variavel
  //toda vez que seu estado for alterado será recarregado a tela
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  console.log('2- valor inicial: ',products)

  //a função async ou assíncrona é executada em segundo plano ou seja o projeto continua rodando 
  //ao mesmo tempo em que a função está sendo executada. De forma que o projeto não ira parar
  //aguardando o resultado da função, ele ira continuar rodando enquanto a função roda tambem
  //por baixo dos panos ate receber o seu valor.
  async function loadProducts() {
    setLoadingProducts(true)
    console.log('4 - antes de carregar os produtos do backend')
    const response = await axios.get('http://localhost:8000/products')
    setProducts(response.data)
    setLoadingProducts(false)
    console.log('6 - depois que carregou os produtos do backend ', products)    
  }

  async function deleteProducts(id) {
   await axios.delete(`http://localhost:8000/products/${id}`, console.log('executou'))  
   window.location.reload(); 
  }

  
  //Executada somente uma vez quando o componente é iniciado
  useEffect(() => {
    console.log('3 - iniciou o useEffect')
    loadProducts()
    console.log('5 - executou o useEffect')
  },[]);

  useEffect(() => {
    console.log('mudou a variavel products')
  },[products]);

  return (
    <div className='container'>
    {loadingProducts ?(
        <h2>Carregando Produtos...</h2> 
    ) : (
      <div className="container-list">
        <h1>Products</h1>
        <div className='container-create'>
          <Link className='link' to={"/products/create"}>
            <button><BsPlus size={15} color="#FFFFFF"/> <p>Create Product</p></button>
          </Link>
        </div>
        <table className='table'>
          <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Details</th>
            <th>Product Price</th>
            <th>Product Size</th>
            <th>User ID</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {products.map((product) => {
            return (
              <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.details}</td>
                <td>{product.price}</td>
                <td>{product.size}</td>
                <td>{product.user_id}</td>
                <td className='action'>
                  <div className='button-edit'>
                  <Link to={'/products/update/'+product.id}>
                    <Button><MdOutlineModeEdit size={15} color="#FFFFFF"/> <p>Edit</p></Button>
                  </Link>
                  </div>
                  <div>
                  <FiTrash onClick={ () => deleteProducts(product.id) } size={18} color="#FF5454"/>
                  </div>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
        )
    }
    </div>
    
  );
}

export default Product;