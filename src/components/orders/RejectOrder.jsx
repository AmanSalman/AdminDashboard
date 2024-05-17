// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Loader from '../Loader/Loader.jsx';
// import axios from 'axios';
// import { UserContext } from '../context/User.jsx';

// function RejectOrder() {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const {orderId} = useParams();
//     const {user} = useContext(UserContext);
//     const RejectOrder = async () => {
//         try {
//             setLoading(true);
//             const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/order/rejectOrder/${orderId}`,{}, {headers:{Authorization: `${user}`,}});
//             if (data.message == 'success') {
//                 toast.success("Rejected successfully");
//             } else if (data.message == "can't reject the order") {
//                 toast.warn(data.message);
//             }
//             setLoading(false);
//         } catch (error) {
//             setError(error.message);
//             setLoading(false);
//         }
//         navigate('/orders')
//     }

//     useEffect(() => {
//         RejectOrder();
//       }, []); 

//     if (loading) {
//         return <Loader />;
//       }

//   return <></>

// }

// export default RejectOrder

import React from 'react'

export default function RejectOrder() {
  return (
    <div>RejectOrder</div>
  )
}
