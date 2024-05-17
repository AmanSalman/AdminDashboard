import React, { useContext, useState } from 'react';
import { UserContext } from '../context/User.jsx';
import { useFormik } from 'formik';
import Input from '../shared/Input.jsx';
import commonStyles from '../books/commonStyles.js';
import './Profile.css';

function ChangePassword() {
    const { token } = useContext(UserContext);
    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    };
    const [changesMade, setChangesMade] = useState(false); // State to track changes

    const onSubmit = () => {
        console.log(formik.values);
        // Here you can add the logic to send the updated password to the server
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate: values => {
            const errors = {};

            // Check if new password matches confirm password
            if (values.newPassword !== values.confirmNewPassword) {
                errors.confirmNewPassword = 'Passwords do not match';
            }

            return errors;
        }
    });

    const handleInputChange = (e) => {
        formik.handleChange(e);
        setChangesMade(true); // Set changes made to true whenever input changes
    };

    const inputConfigurations = [
        { id: 'oldPassword', title: 'Old Password', type: 'password', name: 'oldPassword', required: true },
        { id: 'newPassword', title: 'New Password', type: 'password', name: 'newPassword', required: true },
        { id: 'confirmNewPassword', title: 'Confirm New Password', type: 'password', name: 'confirmNewPassword', required: true }
    ];

    return (
        <div className="profile-container">
            <h2 className='text-uppercase heading'>Change Password :</h2>
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
                    />
                ))}
                {/* Show the button only when changes are made */}
                {changesMade && <button type="submit" style={{ ...styles.button, marginTop: '1rem' }}>Submit</button>}
            </form>
        </div>
    );
}

const styles = {
    ...commonStyles
};

export default ChangePassword;
