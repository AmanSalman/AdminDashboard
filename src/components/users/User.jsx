import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import '../CSSFiles/general.css';
import '../CSSFiles/order.css';
import { Link } from 'react-router-dom';
import Accept from '../../assets/accept (2).png';
import Reject from '../../assets/decline.png';
import { UserContext } from '../context/User.jsx';
import Loader from '../Loader/Loader.jsx';
import Error from '../shared/Error.jsx';

function User() {
  const [error, setError] = useState(null);
  const [Users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {token} = useContext(UserContext);
  
  const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL2}/user/`,
        {headers:{Authorization: `AmanGRAD__${token}`}} 
    );
        setUsers(data.users);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        const {response} = error;
        setError(response.data.message);
      } finally{
        setIsLoading(false)
      }
    };

   //pagination
   const [currentPage, setCurrentPage] = useState(1);
   const recordsPerPage = 6;
   const LastIndex = currentPage * recordsPerPage;
   const firstIndex = LastIndex - recordsPerPage;
   const records = Users.slice(firstIndex, LastIndex);
  const npage = Math.ceil(Users.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(()=>{
    fetchUsers();
  },[])

  if(isLoading)return <Loader />;

    return (
        <>
        <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item active" aria-current="page">Pages</li>
    <li className="breadcrumb-item active" aria-current="page">users</li>
  </ol>
</nav>

        <div className='table-container border'>
            {error != null? <Error message={error}/>:
                    <>
                        <table className='generaltable'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Role</th>
                                    <th>Email</th>
									<th>Disable</th>
                                    <th>Activate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                 records?.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{firstIndex + index + 1}</td> 
                                        <td>{user.username}</td>
                                        <td>{user.phone}</td>
                                        <td style={{ color: user.status === 'Activated' ? 'green' : 'red' }}>{user.status}</td>
                                        <td>{user.role}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                              user.status !== 'Disabled'? 
                                              <>
                                               <Link className='d-flex justify-content-center' to={`/users/disable/${user._id}`}>
                                              <img src={Reject} alt='Reject' width={"45px"} />
                                              </Link>
                                              </>
                                              : null
                                            }
                                            
                                        </td>
                                        <td>
                                            {
                                                user.status !== 'Activated'? <>
                                                 <Link className='d-flex justify-content-center' to={`/users/Activate/${user._id}`}>
                                                <img src={Accept} alt='Activate' width={"32px"} />
                                            </Link>
                                                </> : null
                                            }
                                           
                                        </td>
                                    </tr>
                                ))
                                
                                
                                }
                            </tbody>
                        </table>
                        <nav style={{display:'flex', justifyContent:'center' ,alignItems:'center'}}>
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
                    </>
}
   
        </div>
        </>
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

export default User;
 