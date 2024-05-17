// // import React, {useEffect, useState} from 'react';
// // import axios from 'axios';
// // import '../CSSFiles/general.css';
// // import '../CSSFiles/order.css'
// // import {Link} from 'react-router-dom';
// // import Loader from '../Loader/Loader.jsx';
// // import Accept from '../../assets/accept (2).png';
// // import Reject from '../../assets/decline.png';
// // import {toast} from 'react-toastify';

// // function Orders() {
// // 	const [orders, setOrders] = useState([]);
// // 	const [loading, setLoading] = useState(true);
// // 	const [error, setError] = useState(null);


// // 	const fetchOrders = async () => {
// // 		try {
// // 			const response = await axios.get(`${import.meta.env.VITE_API_URL}/order/getAllOrders`, {
// // 				headers: {
// // 					Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWViNDMzZmRiODBjYmJiZDdhZDY2NDciLCJyb2xlIjoidXNlciIsImlhdCI6MTcxMDI4NDgxNSwiZXhwIjoxNzEwMjg4NDE1fQ.4E-_7k48EznQMnno9DWoJu1u-mobRSgDVETu8JTx8SQ`
// // 				}
// // 			});
// // 			console.log(response.data)
// // 			setOrders(response.data.orders);
// // 			setLoading(false); 
// // 		} catch (error) {
// // 			setError(error.message);
// // 			setLoading(false);
// // 		}
// // 	};


// // 	const AcceptOrder = async (orderId) => {
// // 		try {
// // 			console.log(orderId)
// // 			setLoading(true);
// // 			const response = await axios.put(`${import.meta.env.VITE_API_URL}/order/AcceptOrder/${orderId}`);
// // 			console.log(response.data.message)
// // 			if (response.data.message == 'success') {
// // 				toast.success("Accepted successfully");
// // 				setLoading(false);
// // 			} else if (response.data.message == "can't accept the order") {
// // 				toast.warn(response.data.message);
// // 			}
// // 			setLoading(false);
// // 		} catch (error) {
// // 			setError(error.message);
// // 			setLoading(false);
// // 		}
// // 	}

// // 	const RejectOrder = async (orderId) => {
// // 		try {
// // 			console.log(orderId)
// // 			setLoading(true);
// // 			const response = await axios.put(`${import.meta.env.VITE_API_URL}/order/rejectOrder/${orderId}`);
// // 			console.log(response.data.message)
// // 			if (response.data.message == 'success') {
// // 				toast.success("Rejected successfully");
// // 				setLoading(false);
// // 			} else if (response.data.message == "can't reject the order") {
// // 				toast.warn(response.data.message);
// // 			}
// // 			setLoading(false);
// // 		} catch (error) {
// // 			setError(error.message);
// // 			setLoading(false);
// // 		}
// // 	}


// // 	useEffect(() => {
// // 		fetchOrders();
// // 	}, []);

// // 	if (loading){
// //     return <Loader/>;
// //   }

// // 	return (
// // 		<div className='cssFix'>
// // 			<h2 className='text-uppercase heading text-dark'>Orders :</h2>

// // 			{
// // 			loading && <Loader/>
// // 		}

// // 			{
// // 			error && <p>Error: {error}</p>
// // 		}

// // 			{
// // 			!loading && !error && (
// // 				<table className='generaltable'>
// // 					<thead>
// // 						<tr>
// // 							<th>ID</th>
// // 							<th>Location</th>
// // 							<th>Total Price</th>
// // 							<th>Status</th>
// // 							<th>Accept</th>
// // 							<th>Reject</th>
// // 							{/* Add more table headers based on your data structure */} </tr>
// // 					</thead>
// // 					<tbody> {
// // 						orders.map((order) => (
// // 							<tr key={
// // 								order._id
// // 							}>
// // 								<td>{
// // 									order._id
// // 								}</td>
// // 								<td>{
// // 									order.location
// // 								}</td>
// // 								<td>{
// // 									order.totalPrice
// // 								}</td>
// // 								<td style={
// // 									{
// // 										color: order.status === 'Pending' ? 'orange' : order.status === 'Accepted' ? 'green' : order.status === 'Rejected' ? 'red' : 'inherit',
// // 										fontWeight: '600'
// // 									}
// // 								}>
// // 									{
// // 									order.status
// // 								}</td>
// // 								<td>
// // 									<Link className='d-flex justify-content-center'
// // 										onClick={
// // 											() => AcceptOrder(order._id)
// // 									}><img src={Accept}
// // 											alt='Accept'
// // 											width={"32px"}/></Link>
// // 								</td>
// // 								<td>
// // 									<Link className='d-flex justify-content-center'
// // 										onClick={
// // 											() => RejectOrder(order._id)
// // 									}><img src={Reject}
// // 											alt='Reject'
// // 											width={"45px"}/></Link>
// // 								</td>
// // 								{/* Add more table cells based on your data structure */} </tr>

// // 						))
// // 					} </tbody>
// // 				</table>
// // 			)
// // 		} </div>
// // 	);
// // }

// // export default Orders;
// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import '../CSSFiles/general.css';
// import '../CSSFiles/order.css';
// import { Link } from 'react-router-dom';
// import Loader from '../Loader/Loader.jsx';
// import Accept from '../../assets/accept (2).png';
// import Reject from '../../assets/cross-button.png';
// import { toast } from 'react-toastify';
// import { useQuery } from 'react-query';
// import { UserContext } from '../context/User.jsx';
// import { OrderContext } from '../context/OrderContext.jsx';

// function Orders() {
//     const { orders, error, setError } = useContext(OrderContext);
//     const [isLoading, setIsLoading] = useState(false);
//     let {token,setToken} = useContext(UserContext);

//     //pagination
//     const [currentPage, setCurrentPage] = useState(1);
//     const recordsPerPage = 6;
//     const LastIndex = currentPage * recordsPerPage;
//     const firstIndex = LastIndex - recordsPerPage;
//     const orderedOrders = [...orders].sort((a, b) => {
//         if (a.status === 'Pending') return -1;
//         if (a.status === 'Accepted' && b.status !== 'Pending') return -1;
//         if (a.status === 'Rejected' && b.status !== 'Pending' && b.status !== 'Accepted') return -1;
//         return 1;
//     });
//     const records = orderedOrders.slice(firstIndex, LastIndex);
//     const npage = Math.ceil(orderedOrders.length / recordsPerPage);
//     const numbers = [...Array(npage + 1).keys()].slice(1);

//     const filteredOrders = (status) => {
//         return records?.filter(order => order.status === status);
//     }

//     if (!orders.length) {
//         return <Loader />; // Display loader if orders are being fetched
//     }

//     return (
//         <div className='cssFix table-container' style={{ background: 'white', borderRadius: '18px' }} >
//             <h2 className='text-uppercase heading'>Orders :</h2>

//             {
//                 error && <p>Error: {error}</p>
//             }

//             {
//                 !isLoading && !error && (
//                     <>
//                         <table className='generaltable'>
//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Location</th>
//                                     <th>Total Price</th>
//                                     <th>Status</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredOrders('Pending').map((order) => (
//                                     <tr key={order._id}>
//                                         <td>{order._id}</td>
//                                         <td>{order.location}</td>
//                                         <td>{order.totalPrice}</td>
//                                         <td style={{ color: 'orange', fontWeight: '600' }}>{order.status}</td>
//                                         <td>
//                                             <Link className='d-flex justify-content-center text-decoration-none' style={{ marginBottom: '.5em' }} to={`/acceptOrder/${order._id}`}>
//                                                 <span style={{marginRight:'.5em',color:'green'}}>Accept</span>
//                                                 <img src={Accept} alt='Accept' width={""} />
//                                             </Link>
//                                             <Link className='d-flex justify-content-center text-decoration-none' to={`/rejectOrder/${order._id}`}>
//                                                 <span style={{marginRight:'.5em',color:'red'}}>Reject</span>
//                                                 <img src={Reject} alt='Reject' width={""} />
//                                             </Link>
//                                         </td>
//                                     </tr>
//                                 ))}
//                                 {filteredOrders('Accepted').map((order) => (
//                                     <tr key={order._id}>
//                                         <td>{order._id}</td>
//                                         <td>{order.location}</td>
//                                         <td>{order.totalPrice}</td>
//                                         <td style={{ color: 'green', fontWeight: '600' }}>{order.status}</td>
//                                         <td></td>
//                                     </tr>
//                                 ))}
//                                 {filteredOrders('Rejected').map((order) => (
//                                     <tr key={order._id}>
//                                         <td>{order._id}</td>
//                                         <td>{order.location}</td>
//                                         <td>{order.totalPrice}</td>
//                                         <td style={{ color: 'red', fontWeight: '600' }}>{order.status}</td>
//                                         <td></td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <nav style={{display:'flex', justifyContent:'center' ,alignItems:'center'}}>
//                             <ul className='pagination'>
//                                 <li className='page-item'>
//                                     <a href='#' className='page-link' onClick={prePage}> Prev</a>
//                                 </li>
//                                 {
//                                     numbers.map((n, i) => (
//                                         <li className={`'page-item' ${currentPage === n ? 'active page-item bgPrimary' : 'page-item'}`} key={i}>
//                                             <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
//                                         </li>
//                                     ))
//                                 }

//                                 <li className='page-item'>
//                                     <a href='#' className='page-link' onClick={nextPage}> Next</a>
//                                 </li>
//                             </ul>
//                         </nav>
//                     </>
//                 )
//             }
//         </div>
//     );

//     function prePage() {
//         if (currentPage !== 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     }

//     function changeCPage(id) {
//         setCurrentPage(id);
//     }

//     function nextPage() {
//         if (currentPage !== npage) {
//             setCurrentPage(currentPage + 1);
//         }
//     }
// }

// export default Orders;


import React from 'react'

function Orders() {
  return (
    <div>Orders</div>
  )
}

export default Orders