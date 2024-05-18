import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/User.jsx';
import axios from 'axios';
import { useFormik } from 'formik';
import Input from '../shared/Input.jsx';
import commonStyles from '../books/commonStyles.js';
import './Profile.css';
import { Link } from 'react-router-dom';

function EditProfile() {
    const { token } = useContext(UserContext);
    const initialValues = {
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    };
    const [changesMade, setChangesMade] = useState(false); 

    const onSubmit = () => {
        console.log(formik.values);
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
    });

    const AdminDetails = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/user/profile`, { headers: { Authorization: `AmanGRAD__${token}` } });
            console.log(data);
            formik.setValues({
                ...formik.values,
                username: data.user.username,
                email: data.user.email,
                phone: data.user.phone,
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        AdminDetails();
    }, []);

    const handleInputChange = (e) => {
        formik.handleChange(e);
        setChangesMade(true); 
    };

    const inputConfigurations = [
        { id: 'username', title: 'Username', type: 'text', name: 'username', required: true },
        { id: 'email', title: 'Email', type: 'email', name: 'email', required: true },
        { id: 'phone', title: 'Phone', type: 'tel', name: 'phone', required: true },
    ];

    return (
        <>
         <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item active" aria-current="page">Profile</li>
    <li className="breadcrumb-item active" aria-current="page">Edit</li>
  </ol>
</nav>
        <div className="profile-container">
            <form onSubmit={formik.handleSubmit} encType='multipart/form-data' className=''>
                {inputConfigurations.map(input => (
                    <Input
                        key={input.id}
                        id={input.id}
                        title={input.title}
                        type={input.type}
                        name={input.name}
                        value={formik.values[input.name]}
                        onChange={handleInputChange}
                        onBlur={formik.handleBlur}
                        errors={formik.errors}
                        required={input.required}
                    />
                ))}
                <div className="d-flex flex-column">
                    <Link to='/changepassword' style={{  marginTop: '1rem', color:'rgb(43, 52, 71)' }}>Change Password</Link>
                {changesMade && <button type="submit" style={{ ...styles.button, marginTop: '1rem' }}>Update Profile</button>}
                </div>
            </form> 
        </div>
        
        </>
    );
}

const styles = {
    ...commonStyles
};

export default EditProfile;