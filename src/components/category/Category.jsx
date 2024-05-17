import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../CSSFiles/general.css';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader.jsx';
import '../CSSFiles/order.css';
import Delete from '../../assets/decline.png';
import Update from '../../assets/pen.png'
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import { UserContext } from '../context/User.jsx';
import Error from '../shared/Error.jsx';

function Category() {
  const [Categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {token} = useContext(UserContext)
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/category/`,
       {headers:{Authorization: `AmanGRAD__${token}`}}
      );
      setCategories(data.Categories);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setError(error.message); // Set error state
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const LastIndex = currentPage * recordsPerPage;
  const firstIndex = LastIndex - recordsPerPage;
  const records = Categories.slice(firstIndex, LastIndex);
  const npage = Math.ceil(Categories.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='cssFix table-container border' style={{
      background: 'white',
      borderRadius: '18px'
    }}>
      <h2 className='text-uppercase heading'>Categories :</h2>

      {error != null? <Error/>: <>
      
      <table className="generaltable">
        <thead>
          <tr>
            <th>ID </th>
            <th>Category Name</th>
            <th>Status</th>
            <th>Category image</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {records?.map((category, index) =>
            <tr key={category._id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td style={category.status === 'active' ? { color: 'green', fontWeight: 'bold' } : { color: 'red', fontWeight: 'bold' }}>{category.status}</td>
              <td><img src={category.image.secure_url} className=' img-fluid' style={{ borderRadius: '50%', width: 'fit-content', height: '5em' }} alt='category image' /></td>
              <td><Link className='d-flex justify-content-center' to={`/deleteCategory/${category._id}`}><img src={Delete} alt='Delete' width={"45px"} /></Link></td>
              <td>
                <Link
                  className='d-flex justify-content-center'
                  to={ `/updateCategory/${category.slug}`}
                    state= { {id: category._id} } 
                >
                  <img src={Update} alt='Update' width={"30px"} />
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ul className='pagination'>
          <li className='page-item'>
            <a href='#' className='page-link' onClick={prePage}> Prev</a>
          </li>
          {
            numbers.map((n, i) => (
              <li className={`'page-item' ${currentPage === n ? 'active page-item bgPrimary' : 'page-item'}`} key={i}>
                <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
              </li>
            ))
          }
          <li className='page-item'>
            <a href='#' className='page-link' onClick={nextPage}> Next</a>
          </li>
        </ul>
      </nav>
      </>}

   
    </div>
  );


  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default Category;
