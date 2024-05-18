import './Home.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useContext, useEffect, useState} from 'react';
import {OrderContext} from '../context/OrderContext.jsx'
import Loader from '../Loader/Loader.jsx';
import StatsCard from '../shared/StatsCard.jsx';
import { UserContext } from '../context/User.jsx';
import { FaUsers } from 'react-icons/fa';
import { IoBagCheck } from 'react-icons/io5';
import { BsBoxes } from 'react-icons/bs';
import MyChart from './myChart.jsx';
import { BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';
function Home() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [orders, setOrders] = useState([]);
	const [pendingCount, setPendingCount] = useState(0);
	const [RejectedCount, setRejectedCount] = useState(0);
	const [AcceptedCount, setAcceptedCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);


	const [error, setError] = useState(null);

	const {user} = useContext(UserContext);
	const fetchOrders = async () => {
		try {
			const {data} = await axios.get(`${
				import.meta.env.VITE_API_URL
			}/order/getAllOrders`, {
				headers: {
					Authorization: `${user}`
				}
			});
			setOrders(data.orders);

			// Count orders based on status
			const pending = data.orders.filter(order => order.status === 'Pending').length;
			const rejected = data.orders.filter(order => order.status === 'Rejected').length;
			const accepted = data.orders.filter(order => order.status === 'Accepted').length;

			setPendingCount(pending);
			setRejectedCount(rejected);
			setAcceptedCount(accepted);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false)
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		fetchOrders();
	}, [user, orders]); // Fetch orders whenever user or orders change
		if (isLoading) {
			return <Loader/>
		}
  const data = {
    labels: ['Accepted Orders', 'Rejected Orders'],
    datasets: [
      {
        label: '# of Orders',
        data: [AcceptedCount || 20, RejectedCount || 12],
        backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1.5,
      },
    ],
  };


  return (
    <div className="position-relative h-100">
      <div className="headerContent">

    <div className="dropdown">
  <Link to={'/profile'}>
    <BiUser className='profile-Icon ' />
  </Link>
</div>

		<nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
    <li className="breadcrumb-item active" aria-current="page">Home</li>
  </ol>
</nav>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div className='stats__holder'>
        <StatsCard title="Today's Users" number={2300} change={<FaUsers />} color={'#00b1eb'}/>
      <StatsCard title="Orders" number={150} change={<IoBagCheck />} color={'#ed157f'} />
      <StatsCard title="Stock" number={150}  change={<BsBoxes />} color={'#f5af2c'} />
      {/* <StatsCard title="Active Sessions" number={150} />     */}
        </div>
        
      </div>
        <div className='Home__section2' >
          <div>
          <Doughnut data={data} />
          </div>

          <div>
          <MyChart/>
          </div>
        </div>
    </div>
  );
}

export default Home;
