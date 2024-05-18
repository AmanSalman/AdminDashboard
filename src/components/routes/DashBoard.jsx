import React, { useState } from 'react';
import './Dashboard.css';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { PiBooks } from 'react-icons/pi';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { BiCategory } from 'react-icons/bi';
import { FaTruck, FaUsers } from 'react-icons/fa';
import logo from "../../assets/Logo.png";
const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

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
                        <li>
                        <FaTruck className='DashIcon' />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> 99+</span>
                        <Link to={'/orders'}>Order</Link>
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
