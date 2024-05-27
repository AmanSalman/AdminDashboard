import React, { useContext, useEffect, useState } from 'react';
import './Dashboard.css';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { PiBooks } from 'react-icons/pi';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { BiCategory } from 'react-icons/bi';
import { FaTruck, FaUsers } from 'react-icons/fa';
import logo from "../../assets/Logo.png";
import Loader from '../Loader/Loader';
import { UserContext } from '../context/User';
import { toast } from 'react-toastify';
import axios from 'axios';
const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenC, setIsOpenC] = useState(false);
    const [isOpenOrder, setIsOpenOrder] = useState(false);
    const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const { token } = useContext(UserContext);
  
    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/order/orders`, {
                headers: {
                    Authorization: `AmanGRAD__${token}`
                }
            });
            let pending = data.orders.filter(order => order.status === 'pending')
            console.log(data)
            setOrders(pending.length);
            setIsLoading(false);
        } catch (error) {
            const { response } = error;
            toast(response?.data.message || 'error while fetching orders')
            setIsLoading(false);
            console.error(error);
        }
    }
  
    useEffect(() => {
        fetchOrders();
    }, []);

    if(isLoading){
        return <Loader/>
    }

    return (
        <div className="containercustom">
            <div className="child">
                <div className="Dashboardsec1">
                    <div className="logo-img">
                        <img src={logo} alt="logo" />
                    </div>
                    <span className="DashTitle">DASHBOARD</span>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                    </ul>
                </div>
                <div className="Dashboardsec2">
                    <span className="DashTitle">PAGES</span>
                    <ul>
                        {/* <li>
                        <FaTruck className='DashIcon' />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> 99+</span>
                        <Link to={'/orders'}>Order</Link>
                        </li> */}

<li>
                            <button type="button " className='p-0' onClick={() => setIsOpenOrder(!isOpenOrder)}
                                aria-expanded={isOpenOrder ? "true" : "false"}>

                                <PiBooks className='DashIcon' />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> {orders}</span>
                                <span><a href="#">Orders</a> </span>
                                
                                {isOpenOrder ? <BsChevronUp fontSize='.8rem'/> : <BsChevronDown fontSize='.8rem' />}
                            </button>
                            <div className={`collapse ${isOpenOrder ? 'show' : ''}`} id="booksDropdown">
                                <ul className="flex-column">
                                        <Link to="/orders" activeclassname="active">
                                          Pending Orders
                                        </Link>

                                        <Link to="/accepted" activeclassname="active">
                                            Accepted Orders
                                        </Link>
                                        
                                        <Link to="/sendOrders" activeclassname="active">
                                            Sent Orders
                                        </Link>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <FaUsers className="DashIcon"/>
                            <Link to={'/users'}>Customer</Link>
                            </li>
                        <li>
                            <button type="button " className='p-0' onClick={() => setIsOpen(!isOpen)}
                                aria-expanded={isOpen ? "true" : "false"}>

                                <PiBooks className='DashIcon' />
                                <span><a href="#">Book</a> </span>
                                
                                {isOpen ? <BsChevronUp fontSize='.8rem'/> : <BsChevronDown fontSize='.8rem' />}
                            </button>
                            <div className={`collapse ${isOpen ? 'show' : ''}`} id="booksDropdown">
                                <ul className="flex-column">
                                        <Link to="/books" activeclassname="active">
                                          Books
                                        </Link>

                                        <Link to="/addbook" activeclassname="active">
                                            Add Book
                                        </Link>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <button type="button" className='p-0' onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                                aria-expanded={categoriesDropdownOpen ? "true" : "false"}>

                                <BiCategory className='DashIcon' />
                                <span><a href="#">Category</a> </span>
                                
                                {isOpen ? <BsChevronUp fontSize='.8rem'/> : <BsChevronDown fontSize='.8rem' />}
                            </button>
                            <div className={`collapse ${categoriesDropdownOpen ? 'show' : ''}`} id="booksDropdown">
                                <ul className="flex-column">
                                        <Link to="/categories" activeclassname="active">
                                          Categories
                                        </Link>

                                        <Link to="/addCategory" activeclassname="active">
                                            Add Category
                                        </Link>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <button type="button " className='p-0' onClick={() => setIsOpenC(!isOpenC)}
                                aria-expanded={isOpenC ? "true" : "false"}>

                                <PiBooks className='DashIcon' />
                                <span><a href="">Coupon</a> </span>
                                
                                {isOpenC ? <BsChevronUp fontSize='.8rem'/> : <BsChevronDown fontSize='.8rem' />}
                            </button>
                            <div className={`collapse ${isOpenC ? 'show' : ''}`} id="booksDropdown">
                                <ul className="flex-column">
                                        <Link to="/coupons" activeclassname="active">
                                        Coupons
                                        </Link>

                                        <Link to="/addcoupon" activeclassname="active">
                                            Add Coupon
                                        </Link>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="content">
            <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
