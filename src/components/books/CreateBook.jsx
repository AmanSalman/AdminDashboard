import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './book.css'
import { UserContext } from '../context/User';
import { toast } from 'react-toastify';
const CreateBook = () => {
  const { register, handleSubmit, reset } = useForm();
  const {token} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const onSubmit = async (book) => {
    try {
      setLoading(true);
      console.log(book );
      const formData = new FormData();
      formData.append('isbn', book.isbn);
      formData.append('title', book.title);
      formData.append('price', book.price);
      formData.append('discount', book.discount);
      formData.append('categoryId', book.categoryId);
      formData.append('description', book.description);
      formData.append('publishingHouse', book.publishingHouse);
      formData.append('mainImage', book.mainImage[0]);
      formData.append('status', book.status);
      formData.append('stock', book.stock);
    //   formData.append('createdBY', );

      for (let i = 0; i < book.subImages.length; i++) {
        formData.append('subImages', book.subImages[i]);
        console.log(book.subImages[i]);
      }

      const {data} = await axios.post( `${import.meta.env.VITE_API_URL2}/book`, formData,{
          headers:{
            Authorization: `AmanGRAD__${token}`
          }
      });

      console.log(data);
      if(data.message == 'success') {
        toast.success(data.message);
        reset();
      }
    } catch (error) {
      const {response} = error;
            toast.error(response?.data?.message || "Failed to update");
            console.error(error);
            setLoading(false);
    }finally {
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
    <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
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
        <label htmlFor="discount">Discount (%):</label>
        <input id="discount" name="discount" type="number" {...register('discount')} />
      </div>
      <div>
        <label htmlFor="categoryId">Category ID:</label>
        <input id="categoryId" name="categoryId" type="text" {...register('categoryId', { required: true })} />
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
      <button type="submit" className='button'>Create Book</button>
    </form>
    </div>
    </>
  ); 
};

export default CreateBook;
