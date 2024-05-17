import React, {useContext, useState} from 'react';
import commonStyles from '../books/commonStyles.js';
import '../CSSFiles/general.css';
import './Register.css';
import {useFormik} from 'formik';
import axios from 'axios';
import Loader from '../Loader/Loader.jsx';
import {toast} from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import { UserContext } from '../context/User.jsx';

const Login = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
    let {token,setToken,isLoading,setIsLoading} = useContext(UserContext);
    if(token){
        navigate(-1);
    }
	const initialValues = {
		email: '',
		password: '',
	};

	const onSubmit = async (admin, {resetForm}) => {
		console.log(admin)
		try {
			setLoading(true);
			const {data} = await axios.post(`${import.meta.env.VITE_API_URL2}/auth/login`, admin);
			console.log(data);
			if (data.message == 'success') {
                localStorage.setItem("userToken", `${data.token}`);
				setToken(`${data.token}`);
				toast.success("Login successfully");
                resetForm();
				navigate('/');
				setLoading(false);
			}
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error);
		}
	};

	const formik = useFormik({initialValues, onSubmit});

	return (
		<div className='d-flex align-items-center flex-wrap vh-100'>
			{
			loading ? (
				<Loader/>) : <>

					<div className='d-flex justify-content-center align-items-center vh-100 flex-item-registration flex-wrap' style={{backgroundColor:'#2b3447'}}>

						<img src={Logo}
							alt='logo'
							className=' img-fluid'
							style={
								{
									borderRadius: '50%',
									width: '35%',
									// border: 'solid 1px rgb(156, 131, 131)',
									margin: '1em'
								}
							}/>
							<div>

						<h1 className='HeadingRegister'>Hello Again!</h1>
						<h2 className='subHeading'>Welcome back</h2>
							</div>
					</div>

					{/* <h2 className='text-uppercase heading text-dark'>Register :</h2> */}
                    <div className='flex-item-registration flex-grow-1'>
                        <div className='text-center'>
                        <h2 className='maincolortext'>Sign in</h2>
                        </div>
                       <form onSubmit={
							formik.handleSubmit
						}
						style={
							styles.container
						}
						className=' align-items-center justify-content-center'>

						<input type="email"
							value={
								formik.values.email
							}
							onChange={
								formik.handleChange
							}
							placeholder="email"
							style={
								styles.input
							}
							id="email"
							name="email"/>
						<input type="password"
							value={
								formik.values.publishingHouse
							}
							onChange={
								formik.handleChange
							}
							placeholder="password"
							style={
								styles.input
							}
							id="password"
							name="password"/>
                            <div className='d-flex flex-column align-items-center'>
                                <div className='d-flex'>
             <span className='text-black me-1'>You don't have an accout?  </span> 
             <Link className='pinkMain' to='/register'>Create One.</Link>
                                </div>
             <Link className='pinkMain mb-3' to='/forgotPassword'>Forget Password?</Link>

                            </div>
						<button type="submit"
							style={
								styles.button
						} className='buttonColor '>Sign in</button>
					</form> 
                    </div>
					
				</>
		} </div>
	);
};

const styles = {
	...commonStyles,
	textarea: {
		height: 120,
		resize: 'vertical',
		paddingTop: '10px',
		borderRadius: 10
	}
};

export default Login;
