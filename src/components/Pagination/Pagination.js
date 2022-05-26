import React, { useState, useEffect } from 'react';
import './pagination.css'
import { useNavigate } from 'react-router-dom'

function Pagination (props) {
  let navigate = useNavigate();


  const [next, setNext] = useState(true);
  const [previous, setPrevious] = useState(true);
  const currentPage = parseInt(props.currentPage)

  function changePage (page) {
    navigate(`/products?page=${page}&size=${props.pageSize}`)    
  }
  const queryParams = new URLSearchParams(window.location.search);
  const pageOnURL = queryParams.get('page');

  useEffect(() => {
    if (!(pageOnURL === null)) {
      props.setCurrentPage(pageOnURL)
    }
  },[pageOnURL]);

  useEffect(() => {
    if (currentPage === props.pagesQuantity) {
      setNext(false);
    }
    if (currentPage === 1) {
      setPrevious(false);
    }
  },[]);

  var pages = [];
  for (let page = 1; page <= props.pagesQuantity; page++) {
    pages.push(page)
  }

  return (
    <div className='pagination'>


      <div className='first'>
      {pages.length > 8 ?(
        <a onClick={() => changePage(1)}>first</a>
        ) : ''}
      </div>

      <div className='previous'>
      {previous ?(
      <a onClick={() => changePage(currentPage-1)}>previous</a>
        ) : ''}
      </div>

      <div className='pages'>
      
      {pages.slice(currentPage-(currentPage < 4 ? currentPage : 4 ),currentPage+4).map((page) => {
        return (
          <a key={page.toString()} onClick={() => changePage(page)} className={currentPage == page?'active-page' : ''}>{page}</a>
        )
      })}
      </div>

      <div className='next'>
      {next ?(
        <a onClick={() => changePage(currentPage+1)}>next</a>
      ) : ''}
      </div>
      <div className='last'>
      {pages.length > 8 ?(
        <a onClick={() => changePage(props.pagesQuantity)}>last</a>
        ) : ''}
      </div>

    </div>
  )
}

export default Pagination;