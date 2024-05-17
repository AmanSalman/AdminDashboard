import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import Loader from '../Loader/Loader.jsx';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications

function DeleteBook() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  
  const deleteBook = async () => {
    try {
      setLoading(true);
      const {data} = await axios.delete(`${import.meta.env.VITE_API_URL2}/book/${id}`);
      console.log(data);
      if (data.message === 'success') {
        toast.success("Book Deleted successfully");
      }
      setLoading(false);
    } catch (error) {
      const {response} = error;
      if(response){
        toast.error(response.data.message);
      } else{
        toast.error(error.message);
      }

      setLoading(false);
    } finally{
      
      setLoading(false);
    }
   // navigate('/books');
  };

  useEffect(() => {
    deleteBook();
  }, []); 

  if (loading) {
    return <Loader />;
  }

  // Add your JSX content here if needed

  return <></>; // Ensure you return JSX content
}

export default DeleteBook;
