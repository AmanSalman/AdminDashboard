// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import '../CSSFiles/general.css';
// import { Link } from 'react-router-dom';
// import Loader from '../Loader/Loader.jsx';
// import Accept from '../../assets/accept (2).png';
// import Reject from '../../assets/cross-button.png';
// import { toast } from 'react-toastify';
// import { UserContext } from '../context/User.jsx';
// import Error from '../shared/Error.jsx';
// import { TbArrowBigLeftLineFilled } from 'react-icons/tb';

// function SentOrders() {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const { token } = useContext(UserContext);

//   const fetchOrders = async () => {
//       try {
//           setIsLoading(true);
//           const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/order/orders`, {
//               headers: {
//                   Authorization: `AmanGRAD__${token}`
//               }
//           });
//           let delivered = data.orders.filter(order => (order.status === 'onway' || order.status =='delivered'))
//           console.log(delivered)
//           setOrders(delivered);
//           setIsLoading(false);
//       } catch (error) {
//           const { response } = error;
//           setError(response?.data.message || 'error while fetching orders')
//           setIsLoading(false);
//       }
//   }

//   useEffect(() => {
//       fetchOrders();
//   }, []);

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 4;
//   const lastIndex = currentPage * recordsPerPage;
//   const firstIndex = lastIndex - recordsPerPage;
//   const records = orders.slice(firstIndex, lastIndex);
//   const npage = Math.ceil(orders.length / recordsPerPage);
//   const numbers = [...Array(npage + 1).keys()].slice(1);

//   if (isLoading) {
//       return <Loader />;
//   }

//   return (
//       <>
//           <nav aria-label="breadcrumb">
//               <ol className="breadcrumb">
//                   <li className="breadcrumb-item active" aria-current="page">Pages</li>
//                   <li className="breadcrumb-item active" aria-current="page">Orders</li>
//               </ol>
//           </nav>
//           <div className='table-container container'>
//             <div className='arrow-button'>
//               <Link to={'/'} className='arrow'>
//                   <TbArrowBigLeftLineFilled className='main-color-text arrowback-pages' />
//               </Link>
//             </div>
//               {error ? (
//                   <Error message={error} />
//               ) : (
//                 records.length > 0 ?
//                   <>
//                       <table className='generaltable'>
//                           <thead>
//                               <tr>
//                                   <th>ID</th>
//                                   <th>Location</th>
//                                   <th>Total Price</th>
//                                   <th>Phone</th>
//                                   <th>delivered</th>
//                                   <th>Status</th>
//                                   <th>Reject</th>
//                                   <th>Order Details</th>
//                               </tr>
//                           </thead>
//                           <tbody>
//                               {records?.map((order,index) => (
//                                   <tr key={order._id}>
//                                       <td>{firstIndex + index +1}</td>
//                                       <td>{order.Address}</td>
//                                       <td>{order.finalPrice}</td>
//                                       <td>{order.phone}</td>
//                                       <td>
//                                       <Link className='d-flex justify-content-center text-decoration-none btn btn-warning' to={`/delivered/${order._id}`} state={{from:'/sendOrders'}}>
//                                       delivered 
//                                             </Link>
//                                       </td>
//                                       <td className='text-success fw-medium'>{order.status}</td>
//                                       <td>
//                                             <Link className='d-flex justify-content-center text-decoration-none' to={`/rejectOrder/${order._id}`} state={{ from: '/sendOrders' }}  >
//                                                 <img src={Reject} alt='Reject' width={"32px"} />
//                                             </Link>
//                                         </td>
//                                       <td>
//                                           <Link to={`/orderDetails/${order._id}`}>
//                                               Show Books
//                                           </Link>
//                                       </td>
//                                   </tr>
//                               ))}
//                           </tbody>
//                       </table>

//                       <nav className='pagination-style'>
//                           <ul className='pagination'>
//                               <li className='page-item'>
//                                   <a href='#' className='page-link' onClick={prePage}>Prev</a>
//                               </li>
//                               {numbers.map((n, i) => (
//                                   <li key={i} className={`page-item ${currentPage === n ? 'active page-item bgPrimary' : 'page-item'}`}>
//                                       <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
//                                   </li>
//                               ))}
//                               <li className='page-item'>
//                                   <a href='#' className='page-link' onClick={nextPage}>Next</a>
//                               </li>
//                           </ul>
//                       </nav>
//                   </> : <p className='text-center'>No orders found.</p>
//               )}
//           </div>
//       </>
//   );

//   function prePage() {
//       if (currentPage !== 1) {
//           setCurrentPage(currentPage - 1);
//       }
//   }

//   function changeCPage(id) {
//       setCurrentPage(id);
//   }

//   function nextPage() {
//       if (currentPage !== npage) {
//           setCurrentPage(currentPage + 1);
//       }
//   }
// }

// export default SentOrders
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../CSSFiles/general.css';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader.jsx';
import Accept from '../../assets/accept (2).png';
import Reject from '../../assets/cross-button.png';
import { toast } from 'react-toastify';
import { UserContext } from '../context/User.jsx';
import Error from '../shared/Error.jsx';
import { TbArrowBigLeftLineFilled } from 'react-icons/tb';

function SentOrders() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const { token } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 4;

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/order/orders`, {
                headers: {
                    Authorization: `AmanGRAD__${token}`
                }
            });
            let delivered = data.orders.filter(order => (order.status === 'onway' || order.status == 'delivered'))
            setOrders(delivered);
            setIsLoading(false);
        } catch (error) {
            const { response } = error;
            setError(response?.data.message || 'Error while fetching orders');
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(order =>
        order.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const displayedOrders = filteredOrders.slice(firstIndex, lastIndex);
    const npage = Math.ceil(filteredOrders.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Pages</li>
                    <li className="breadcrumb-item active" aria-current="page">Orders</li>
                </ol>
            </nav>
            <div className='table-container container'>
                <div className='arrow-button'>
                    <Link to={'/'} className='arrow'>
                        <TbArrowBigLeftLineFilled className='main-color-text arrowback-pages' />
                    </Link>
                </div>
                {error ? (
                    <Error message={error} />
                ) : (
                    <>
                        <div className="search-container my-3">
                            <input
                                type="text"
                                placeholder="Search by Location or Phone"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-control"
                            />
                             <Link className='button'>
                                Deliver All Orders
                            </Link>
                        </div>
                        {displayedOrders.length > 0 ? (
                            <>
                                <table className='generaltable'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Location</th>
                                            <th>Total Price</th>
                                            <th>Phone</th>
                                            <th>Delivered</th>
                                            <th>Status</th>
                                            <th>Reject</th>
                                            <th>Order Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayedOrders.map((order, index) => (
                                            <tr key={order._id}>
                                                <td>{firstIndex + index + 1}</td>
                                                <td>{order.Address}</td>
                                                <td>{order.finalPrice}</td>
                                                <td>{order.phone}</td>
                                                <td>
                                                    <Link className='d-flex justify-content-center text-decoration-none btn btn-warning' to={`/delivered/${order._id}`} state={{ from: '/sendOrders' }}>
                                                        Delivered
                                                    </Link>
                                                </td>
                                                <td className='text-success fw-medium'>{order.status}</td>
                                                <td>
                                                    <Link className='d-flex justify-content-center text-decoration-none' to={`/rejectOrder/${order._id}`} state={{ from: '/sendOrders' }}>
                                                        <img src={Reject} alt='Reject' width={"32px"} />
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link to={`/orderDetails/${order._id}`}>
                                                        Show Books
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <nav className='pagination-style'>
                                    <ul className='pagination'>
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <a href='#' className='page-link' onClick={prePage}>Prev</a>
                                        </li>
                                        {numbers.map((n, i) => (
                                            <li key={i} className={`page-item ${currentPage === n ? 'active page-item bgPrimary' : 'page-item'}`}>
                                                <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === npage ? 'disabled' : ''}`}>
                                            <a href='#' className='page-link' onClick={nextPage}>Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </>
                        ) : <p className='text-center'>No orders found.</p>}
                    </>
                )}
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

export default SentOrders;
