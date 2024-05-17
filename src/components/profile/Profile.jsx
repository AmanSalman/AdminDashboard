// import React, { useContext, useEffect } from 'react';
// import './Profile.css';
// import Input from '../shared/Input.jsx'; 
// import commonStyles from '../books/commonStyles.js';
// import { useFormik } from 'formik';
// import axios from 'axios';
// import { UserContext } from '../context/User.jsx';

// export default function Profile() {
    // const initialValues = {
    //     username: '',
    //     email: '',
    //     phone: '',
    //     role: '',
    //     status: '',
    //     password: '',
    //     confirmPassword: ''
    // };

    // const onSubmit = async()=>{

    // }
    // const formik = useFormik({
    //     initialValues,
    //     onSubmit,
    // });

//     const token =useContext(UserContext);
//     const Profile = async ()=>{
//         try {
//             console.log(token);
//             const {data} = await axios.get(`${import.meta.env.VITE_API_URL2}/user/profile`, 
//                 {
//                     headers: {
//                         Authorization: `AmanGRAD__${token}`
//                     }
//                 }
//             );
//             console.log(data);
//         } catch (error) {
            
//         }
//     }

//     useEffect(()=>{
//         Profile();
//     },[])

    // Array of input configurations
    // const inputConfigurations = [
    //     { id: 'username', title: 'Username', type: 'text', name: 'username', required: true },
    //     { id: 'email', title: 'Email', type: 'email', name: 'email', required: true },
    //     { id: 'phone', title: 'Phone', type: 'tel', name: 'phone', required: true },
    //     { id: 'role', title: 'Role', type: 'text', name: 'role', required: true },
    //     { id: 'status', title: 'Status', type: 'text', name: 'status', required: true },
    //     { id: 'password', title: 'Password', type: 'password', name: 'password', required: true },
    //     { id: 'confirmPassword', title: 'Confirm Password', type: 'password', name: 'confirmPassword', required: true }
    // ];

    // return (
    //     <div className="profile-container">
    //         <h2 className='text-uppercase heading'>Edit Profile :</h2>
    //         <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
    //             {/* Render inputs based on inputConfigurations array */}
    //             {inputConfigurations.map(input => (
    //                 <Input
    //                     key={input.id}
    //                     id={input.id}
    //                     title={input.title}
    //                     type={input.type}
    //                     name={input.name}
    //                     value={initialValues[input.name]}
    //                     onChange={() => {}}
    //                     onBlur={() => {}}
    //                     errors={{}}
    //                     required={input.required}
    //                 />
    //             ))}
    //             <button type="submit" style={styles.button}>Update Profile</button>
    //         </form>
    //     </div>
    // );
// }

// const styles = {
//     ...commonStyles,
// }


import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/User.jsx';
import axios from 'axios';
import { useFormik } from 'formik';
import Input from '../shared/Input.jsx';
import commonStyles from '../books/commonStyles.js';
import './Profile.css';
import { Link } from 'react-router-dom';

function Profile() {
    const { token } = useContext(UserContext);
    const initialValues = {
        username: '',
        email: '',
        phone: '',
        role: '',
        status: '',
        password: '',
        confirmPassword: ''
    };
    const [changesMade, setChangesMade] = useState(false); // State to track changes

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
                role: data.user.role,
                status: data.user.status
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
        setChangesMade(true); // Set changes made to true whenever input changes
    };

    const inputConfigurations = [
        { id: 'username', title: 'Username', type: 'text', name: 'username', required: true },
        { id: 'email', title: 'Email', type: 'email', name: 'email', required: true },
        { id: 'phone', title: 'Phone', type: 'tel', name: 'phone', required: true },
        { id: 'role', title: 'Role', type: 'text', name: 'role', required: true },
        { id: 'status', title: 'Status', type: 'text', name: 'status', required: true },
    ];

    return (
        <>
        <h1 style={{fontSize:'1.75rem', color: '#5a5c69', marginBottom:'1.5rem', paddingLeft:'1rem'}}>/ Profile</h1>
        <div className="profile-container">
            <h2 className='text-uppercase heading'>Edit Profile :</h2>
            <form onSubmit={formik.handleSubmit} encType='multipart/form-data' className=''>
                {/* Render inputs based on inputConfigurations array */}
                {inputConfigurations.map(input => (
                    <Input
                        key={input.id}
                        id={input.id}
                        title={input.title}
                        type={input.type}
                        name={input.name}
                        value={formik.values[input.name]}
                        onChange={handleInputChange} // Change to handleInputChange
                        onBlur={formik.handleBlur}
                        errors={formik.errors}
                        required={input.required}
                        readOnly={input.name === 'role' || input.name === 'status'}
                    />
                ))}
                {/* Show the button only when changes are made */}
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

export default Profile;
