import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './book.css';
import { UserContext } from '../context/User';
import { toast } from 'react-toastify';
import { SlArrowLeft } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { VscArrowSmallLeft } from 'react-icons/vsc';
import { TbArrowBigLeftLineFilled } from 'react-icons/tb';

const CreateBook = () => {
  const { register, handleSubmit, reset } = useForm();
  const { token } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL2}/category`, {
          headers: {
            Authorization: `AmanGRAD__${token}`
          }
        });
        setCategories(data.Categories);
        console.log(data.Categories);
      } catch (error) {
        setError("Error while fetching categories");
      setLoading(false);
      }
    };

    fetchCategories();
  }, [token]);

  const onSubmit = async (book) => {
    try {
      setLoading(true);
      console.log(book);
      const formData = new FormData();
      formData.append('isbn', book.isbn);
      formData.append('title', book.title);
      formData.append('price', book.price);
      formData.append('Discount', book.Discount);
      formData.append('categoryName', book.categoryName);
      formData.append('description', book.description);
      formData.append('publishingHouse', book.publishingHouse);
      formData.append('mainImage', book.mainImage[0]);
      formData.append('status', book.status);
      formData.append('stock', book.stock);

      for (let i = 0; i < book.subImages.length; i++) {
        formData.append('subImages', book.subImages[i]);
        console.log(book.subImages[i]);
      }

      const { data } = await axios.post(`${import.meta.env.VITE_API_URL2}/book`, formData, {
        headers: {
          Authorization: `AmanGRAD__${token}`
        }
      });

      console.log(data);
      if (data.message === 'success') {
        toast.success('Book created successfully');
        // reset();
      }
    } catch (error) {
      const { response } = error;
      toast.error(response?.data?.message || 'Failed to create book');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page">
          Book
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Add Book
        </li>
      </ol>
      <div className="component-container d-flex flex-column bookadd">
        <Link to={'/books'} className='arrow'><TbArrowBigLeftLineFilled className='main-color-text arrowback-pages' /></Link>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div>
            <label htmlFor="isbn">ISBN:</label>
            <input id="isbn" name="isbn" type="text" {...register('isbn', { required: true })} />
          </div>
          <div>
            <label htmlFor="title">Title:</label>
            <input id="title" name="title" type="text" {...register('title', { required: true })} />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input id="price" name="price" type="number" {...register('price', { required: true })} />
          </div>
          <div>
            <label htmlFor="Discount">Discount (%):</label>
            <input id="Discount" name="Discount" type="number" {...register('Discount')} />
          </div>
          <div>
            <label htmlFor="categoryName">Category:</label>
            <select id="categoryName" name="categoryName" {...register('categoryName', { required: true })}>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {error && <p className='text-danger m-0'>{error}</p>}
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" {...register('description', { required: true })}></textarea>
          </div>
          <div>
            <label htmlFor="publishingHouse">Publishing House:</label>
            <input id="publishingHouse" name="publishingHouse" type="text" {...register('publishingHouse')} />
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <select id="status" name="status" {...register('status', { required: true })}>
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
          <div>
            <label htmlFor="stock">Stock:</label>
            <input id="stock" name="stock" type="number" step="1" {...register('stock', { required: true })} />
          </div>
          <div>
            <label htmlFor="mainImage">Main Image:</label>
            <input id="mainImage" name="mainImage" type="file" {...register('mainImage', { required: true })} />
          </div>
          <div>
            <label htmlFor="subImages">Sub Images:</label>
            <input id="subImages" name="subImages" type="file" multiple {...register('subImages')} />
          </div>
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Creating...' : 'Create Book'}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBook;
