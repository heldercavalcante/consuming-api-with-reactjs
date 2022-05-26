
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import './list.css';
import { FiTrash } from 'react-icons/fi'
import { BsPlus } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import Pagination from '../../../components/Pagination/Pagination';


function Product() {
  //useState é utilizado para renderizar a tela de acordo com as mudanças do estado da variavel
  //toda vez que seu estado for alterado será recarregado a tela
  // const queryParams = new URLSearchParams(window.location.search);
  // const pageURL = queryParams.get('page');
  // console.log('pageURL: ',pageURL)

  const [currentPage, setCurrentPage] = useState(1);
  console.log('currentPage: ',currentPage)
  const pageSize = 10

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  //a função async ou assíncrona é executada em segundo plano ou seja o projeto continua rodando 
  //ao mesmo tempo em que a função está sendo executada. De forma que o projeto não ira parar
  //aguardando o resultado da função, ele ira continuar rodando enquanto a função roda tambem
  //por baixo dos panos ate receber o seu valor.
  async function loadProducts() {
    console.log('executou o loadProducts',`http://localhost:8000/products?page=${currentPage}&size=${pageSize}`)
    setLoadingProducts(true)
    const request = await axios.get(`http://localhost:8000/products?page=${currentPage}&size=${pageSize}`)
    const response = request
    setProducts(response.data)
    setLoadingProducts(false)   
  }


  if ( products.total % products.size === 0) {
    var pages_quantity = (products.total / products.size)
  } else {
    pages_quantity = (Math.floor(products.total / products.size))+1
  }

  //   if ( products.total % products.count === 0) {
  //   var pages_quantity = (products.total / products.count)
  // } else if (currentPage === null) {
  //   pages_quantity = (8)
  // } else {
  //   pages_quantity = (Math.floor(products.total / products.count))+1
  // }

  async function deleteProducts(id) {
   await axios.delete(`http://localhost:8000/products/${id}`, console.log('executou'))  
   loadProducts() 
  }

  
  //Executada somente uma vez quando o componente é iniciado
  useEffect(() => {
    loadProducts()
  },[]);

  useEffect(() => {
    console.log('alterou a pagina', currentPage)
    loadProducts()
  },[currentPage]);


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
            <th>User ID</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {products.items.map((product) => {
            return (
              <tr key={product.id.toString()}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.details}</td>
                <td>{product.price}</td>
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
        <div>
          <Pagination  
          pagesQuantity={pages_quantity}
          count={products.size}
          currentPage={currentPage}
          total={products.total}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          />
        </div>
      </div>
        )
    }
    </div>
    
  );
}

export default Product;