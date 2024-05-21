import React, { useContext, useEffect, useState } from 'react';
import commonStyles from '../shared/commonStyles.js';
import { useFormik } from 'formik';
import axios from 'axios';
import Loader from '../Loader/Loader.jsx';
import { toast } from 'react-toastify';
import Input from '../shared/Input.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateCategorySchema } from '../../validation/CategoryValidation.js';
import { UserContext } from '../context/User.jsx';

const UpdateCategory = () => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const categoryId = location.state?.id;
    const navigate = useNavigate();
    const {token} = useContext(UserContext);
    const initialValues = { 
        name: '',
        status: '',
        image: '',
    };

    const handelFieldChange = (event) => {
        // Check if the uploaded image passes validation
        if (updateCategorySchema.isValidSync({ image: event.target.files[0] })) {
            // If it passes validation, set the image field
            formik.setFieldValue('image', event.target.files[0]);
        } else {
            // If it doesn't pass validation, reset the image field to an empty value
            event.target.value = '';
            formik.setFieldValue('image', '');
            // Optionally, you can also show a message to the user
            toast.error('Please upload a valid image (JPEG, PNG, or WEBP format, max 2MB)');
        }
    };
    

    const onSubmit = async (category) => {
        try {
            const formData = new FormData();
            formData.append('name', category.name);
            formData.append('status', category.status);
            formData.append('image', category.image);

            setLoading(true);
            const { data } = await axios.patch(
                `${import.meta.env.VITE_API_URL2}/category/${categoryId}`,
                formData, {headers:{Authorization: `AmanGRAD__${token}`}} 
            );

            if (data.message === 'success') {
                toast.success('Updated successfully');
            } else {
                toast.warn('Error while updating the category');
            }
        } catch (error) {
            const {response} = error;
			if (response) {
				toast.error(response.data.message);
			} else {
				toast.error(error.message);
			}
            setLoading(false)
        } finally {
            setLoading(false);
            navigate('/categories');
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: updateCategorySchema,
        validateOnChange: false,
        validateOnBlur: false,
    });

    const statusOptions = [
        { label: 'active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
    ]; 

    const renderInputs = [
        {
            id: 'name',
            type: 'text',
            name: 'name',
            title: 'Name',
            value: formik.values.name,
            required: true,
        },
        {
            id: 'status',
            type: 'select',
            name: 'status',
            title: 'Status',
            value: formik.values.status,
            required: true,
            options: statusOptions,
        },
        {
            id: 'image',
            type: 'file',
            name: 'image',
            title: 'Image',
            onChange: handelFieldChange,
            required: false,
        },
    ].map((input, index) => {
        return (
            <div key={index} className='input-container pb-4 pt-3'>
                <label htmlFor={input.id} className='form-label'>
                    {input.title}
                </label>
                {input.type === 'select' ? (
                    <select
                        id={input.id}
                        name={input.name}
                        value={formik.values[input.name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='form-control'
                        required={input.required}
                    >
                        <option value='' disabled>
                            Select {input.title}
                        </option>
                        {input.options.map((option, idx) => (
                            <option key={idx} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={input.type}
                        id={input.id}
                        name={input.name}
                        value={input.value}
                        onChange={input.onChange ? input.onChange : formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='form-control'
                        required={input.required}
                    />
                )}
                {/* Error message */}
                {formik.touched[input.name] && formik.errors[input.name] && (
                    <p className='text-danger'>
                        {formik.errors[input.name] === 'Supported formats are JPEG, PNG, and WEBP' ?
                            'Supported formats are JPEG, PNG, and WEBP' :
                            'Max size is 2MB'}
                    </p>
                )}
            </div>
        );
    });

    const [imageUrl, setImageUrl] = useState('');

    const getDetails = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/category/${categoryId}`,
                {headers:{Authorization: `AmanGRAD__${token}`}}
            );
            formik.setFieldValue('name', data.category.name);
            formik.setFieldValue('status', data.category.status);
            setImageUrl(data.category.image.secure_url); // Set image URL
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDetails();
    }, []);

    return (
        <div className='cssFix w-100' style={{ background: 'white', borderRadius: '18px' }}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <h2 className='text-uppercase heading'>Update Category :</h2>
                    <div className='d-flex align-items-center w-50'>
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt='Category Image'
                                style={{ borderRadius: '50%' }}
                                className='img-fluid w-50'
                            />
                        )}
                    </div>
                    <form onSubmit={formik.handleSubmit} style={styles.container}>
                        {renderInputs}
                        <button type='submit' className='button' disabled={!formik.isValid}>
                            Update Category
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

const styles = {
    ...commonStyles,
    textarea: {
        height: 120,
        resize: 'vertical',
        paddingTop: '10px',
        borderRadius: 10,
    },
};

export default UpdateCategory;
