import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import '../books/book.css';
import { UserContext } from '../context/User';
import { toast } from 'react-toastify';
import { SlArrowLeft } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { VscArrowSmallLeft } from 'react-icons/vsc';
import { TbArrowBigLeftLineFilled } from 'react-icons/tb';

const CreateCoupon = () => {
  const { register, handleSubmit, reset } = useForm();
  const { token } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const onSubmit = async (Coupon) => {
    try {
      setLoading(true);
      console.log(Coupon);
      const formData = new FormData();
      formData.append('name', Coupon.name);
      formData.append('status', Coupon.status);
      formData.append('Amount', Coupon.Amount);

      const { data } = await axios.post(`${import.meta.env.VITE_API_URL2}/coupon`, formData, {
        headers: {
          Authorization: `AmanGRAD__${token}`
        }
      });

      console.log(data);
      if (data.message === 'success') {
        toast.success('coupon created successfully');
        reset();
      }
    } catch (error) {
      const { response } = error;
      toast.error(response?.data?.message || 'Failed to create coupon');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page">
        Coupon
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Add Coupon
        </li>
      </ol>
      <div className="component-container d-flex flex-column bookadd">
        <Link to={'/'}><TbArrowBigLeftLineFilled className='main-color-text arrowback-pages' /></Link>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div>
            <label htmlFor="name">Name:</label>
            <input id="name" name="name" type="text" {...register('name', { required: true })} />
          </div>
          <div>
            <label htmlFor="Amount">Price:</label>
            <input id="Amount" name="Amount" type="number" {...register('Amount', { required: true })} />
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <select id="status" name="status" {...register('status', { required: true })}>
              <option value="active">Active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Creating...' : 'Create Coupon'}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateCoupon;
