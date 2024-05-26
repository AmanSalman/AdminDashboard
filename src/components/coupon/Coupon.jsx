import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader.jsx";
import Delete from "../../assets/decline.png";
import Update from "../../assets/pen.png";
import { UserContext } from "../context/User.jsx";
import Error from "../shared/Error.jsx";
import { TbArrowBigLeftLineFilled } from "react-icons/tb";

function Coupon() {
  const [error, setError] = useState(null);
  const [coupons, setcoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useContext(UserContext);

  const fetchcoupons = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL2}/coupon`,
        { headers: { Authorization: `AmanGRAD__${token}` } }
      );
      console.log(data)
      setcoupons(data.coupon);
      setIsLoading(false);
    } catch (error) {
      const { response } = error;
      if (response) {
        setError(response.data.message);
      } else {
        setError(error.message);
      }
      setIsLoading(false);
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = coupons.slice(firstIndex, lastIndex);
  const npage = Math.ceil(coupons.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    fetchcoupons();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            Pages
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Coupon
          </li>
          <li className="breadcrumb-item active" aria-current="page">
          Coupons
          </li>
        </ol>
      </nav>

      <div
        className="table-container border"
        style={{ background: "white", borderRadius: "18px", padding: "1rem" }}
      >
        <Link to={'/'}><TbArrowBigLeftLineFilled className='main-color-text arrowback-pages'/></Link>
        {error != null ? (
          <Error message={error} />
        ) : (
          <>
            <table className="generaltable">
              <thead>
                <tr>
                  <th>name</th>
                  <th>status</th>
                  <th>Amount</th>
                  <th>Delete</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {records.map((coupon) => (
                  <tr key={coupon._id}>
                    <td>{coupon.name}</td>
                    <td>{coupon.status}</td>
                    <td>{coupon.Amount}</td>
                    <td>
                      <Link
                        className="d-flex justify-content-center"
                        to={`/deleteCoupon/${coupon._id}`}
                      >
                        <img src={Delete} alt="Delete" width={"45px"} />
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/UpdateCoupon/${coupon._id}`}
                        className="d-flex justify-content-center"
                      >
                        <img src={Update} alt="Update" width={"30px"} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <nav
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={prePage} disabled={currentPage === 1}>
                    Prev
                  </button>
                </li>
                {numbers.map((n, i) => (
                  <li
                    className={`page-item ${currentPage === n ? "active" : ""}`}
                    key={i}
                  >
                    <button className="page-link" onClick={() => changeCPage(n)}>
                      {n}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === npage ? "disabled" : ""}`}>
                  <button className="page-link" onClick={nextPage} disabled={currentPage === npage}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </>
  );

  function prePage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default Coupon;
