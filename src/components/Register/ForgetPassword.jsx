import React, {useState} from 'react';
import commonStyles from '../books/commonStyles.js';
import '../CSSFiles/general.css';
import './Register.css';
import {useFormik} from 'formik';
import axios from 'axios';
import Loader from '../Loader/Loader.jsx';
import {toast} from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';
import Logo from '../../assets/Logo.png';

function ForgetPassword() {
    const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const initialValues = {
		email: '',
	};

	const onSubmit = async (admin, {resetForm}) => {
		console.log(admin)
		try {
			setLoading(true);
			const {data} = await axios.post(`${
				import.meta.env.VITE_API_URL2
			}/auth/register`, admin);
			console.log(data);
			if (data.message == 'success') {
				toast.success("registered successfully");
				// navigate('/login');
				resetForm();
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

					<div className='d-flex justify-content-center align-items-center vh-100 flex-item-registration' style={{backgroundColor:'#2b3447'}}>

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
							<div className='mediaQheader'> 

						<h1 className='HeadingRegister'>Hello Again!</h1>
						<h2 className='subHeading'>Welcome back</h2>
							</div>
					</div>

					{/* <h2 className='text-uppercase heading text-dark'>Register :</h2> */}
                    <div className='flex-item-registration1 flex-grow-1'>
					<div className='text-center'>
                        <h2 className='maincolortext'>Reset Password</h2>
                        </div>
                       <form onSubmit={formik.handleSubmit} style={styles.container} className=' align-items-center justify-content-center'>
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
							name="email"
							autoComplete='email'/>
							
						<button type="submit"
							style={
								styles.button
						} className='buttonColor'>Send Code</button>
					</form> 
                    </div>
					
				</>
		} </div>
	);
}
const styles = {
	...commonStyles,
	textarea: {
		height: 120,
		resize: 'vertical',
		paddingTop: '10px',
		borderRadius: 10
	}
};

export default ForgetPassword