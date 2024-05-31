import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BsStarFill } from 'react-icons/bs';
import Pagination from '../shared/Pagination';

function ReviewCard() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5; // Number of records per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL2}/book/${id}`
        );
        setReviews(data.book.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = (id) => {
    const updatedReviews = reviews.filter(review => review.id !== id);
    setReviews(updatedReviews);
  }

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <BsStarFill key={index} color={'gold'} />
    ));
  }

  // Pagination Logic
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentReviews = reviews.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(reviews.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <div className="row">
        {currentReviews.map(review => (
          <div key={review._id} className="col-md-12">
            <div className="card mt-3">
              <div className="card-body">
                {/* <h5 className="card-title">{review.username}</h5> */}
                <p className="card-text">{review.comment}</p>
                <p className="card-text">{renderStars(review.rating)}</p>
                <button className="btn btn-danger" onClick={() => handleDelete(review.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default ReviewCard;
