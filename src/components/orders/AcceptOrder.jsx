// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Loader from '../Loader/Loader.jsx';
// import axios from 'axios';
// import { UserContext } from '../context/User.jsx';

// function AcceptOrder() {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const {orderId} = useParams();
//     const {user} = useContext(UserContext);
//     const AcceptOrder = async () => {
//         try {

//             setLoading(true);
//             const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/order/AcceptOrder/${orderId}`,{}, {headers:{Authorization: `${user}`,}}); 
//             if (data.message == 'success') {
//                 toast.success("Accepted successfully");
//                 setLoading(false);
//             } else if (data.message == "can't accept the order") {
//                 toast.warn(data.message);
//                 setLoading(false);
//             }
//             setLoading(false);
//         } catch (error) {
//             setError(error.message);
//             setLoading(false);
//         }

//         navigate('/orders')
//     }

//     useEffect(() => {
//         AcceptOrder();
//       }, []); 

//     if (loading) {
//         return <Loader />;
//       }

//   return <></>

// }

// export default AcceptOrder;

import React from 'react'

function AcceptOrder() {
  return (
    <div>AcceptOrder</div>
  )
}

export default AcceptOrder