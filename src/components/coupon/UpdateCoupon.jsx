import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/User';
import '../books/book.css';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import { TbArrowBigLeftLineFilled } from 'react-icons/tb';
import Error from '../shared/Error';

const UpdateCoupon= () => {
    const { id } = useParams();
    const { register, handleSubmit, setValue, getValues } = useForm();
    const [loading, setLoading] = useState(true);
    const { token } = useContext(UserContext);
    const [initialCouponData, setInitialCouponData] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchCoupon = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/coupon/${id}`, {
                headers: {
                    Authorization: `AmanGRAD__${token}`
                }
            });
            const coupondata = data.coupon;
            setInitialCouponData(coupondata);
            setValue('name', coupondata.name);
            setValue('status', coupondata.status);
            setValue('Amount', coupondata.Amount);
        } catch (error) {
              setError(' while fetching the coupon information');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const getChangedData = (currentValues, initialValues) => {
        const changedData = {};
        for (const key in currentValues) {
            if (currentValues[key] !== initialValues[key]) {
                changedData[key] = currentValues[key];
            }
        }
        return changedData;
    };


    const onSubmit = async (data) => {
        const currentValues = getValues();
        const changedData = getChangedData(currentValues, initialCouponData);

        const formData = new FormData();
        for (const key in changedData) {
            formData.append(key, changedData[key]);
        }

        try {
            setLoading(true);
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL2}/coupon/${id}`, formData, {
                headers: {
                    Authorization: `AmanGRAD__${token}`
                }
            });

            console.log(data)
            if (data.message === "success") {
                toast.success("Coupon updated successfully");
                navigate(`/coupons`);
            }
        } catch (error) {
            const { response } = error;
            toast.error(response?.data?.message || 'Failed to update coupon');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupon();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                    Coupon
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Update Coupon
                </li>
            </ol>
               
                   <div className="component-container updateBook">
            <Link to={'/coupons'}><TbArrowBigLeftLineFilled className='main-color-text arrowback-pages'/></Link>
            {
             error != null ? (
                <Error message={error} />
              ):<>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div>
                        <label>Coupon's Name :</label>
                        <input {...register('name')} type="text" />
                    </div>
                    <div>
                        <label>Amount :</label>
                        <input {...register('Amount')} type="number" />
                    </div>
                    <div>
                        <label>Status :</label>
                        <select {...register('status')}>
                            <option value="active">Active</option>
                            <option value="inactive">inactive</option>
                        </select>
                    </div>
                    <button type="submit" className="button">Update Coupon</button>
                </form>
                </>
            }
            </div>
           
        </>
    );
};

export default UpdateCoupon;
