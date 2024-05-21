import React, {useContext, useEffect, useState} from "react";
import commonStyles from "../shared/commonStyles.js";
import {useFormik} from "formik";
import axios from "axios";
import Loader from "../Loader/Loader.jsx";
import {toast} from "react-toastify";
import Input from "../shared/Input.jsx";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import {UserContext} from "../context/User.jsx";

const UpdateBook = () => {
	const [loading, setLoading] = useState(false);
	// const {id} = useParams();
	const {token} = useContext(UserContext);
    const navigate = useNavigate()
    const location = useLocation();
    const BookId = location.state?.id;
	const initialValues = {
		isbn: "",
		title: "",
		price: 0,
		description: "",
		publishingHouse: "",
		categoryName: "",
		image: null
	};

	const handelFieldChange = (event) => {
		formik.setFieldValue("image", event.target.files[0]);
	};

	const onSubmit = async (book) => {
		try {
			setLoading(true);
			const formData = new FormData();
			formData.append("isbn", book.isbn);
			formData.append("title", book.title);
			formData.append("price", book.price);
			formData.append("image", book.image);
			formData.append("description", book.description);
			formData.append("publishingHouse", book.publishingHouse);
			formData.append("categoryName", book.categoryName);

			const {data} = await axios.patch(`${
				import.meta.env.VITE_API_URL2
			}/book/${BookId}`, formData, {
				headers: {
					Authorization: `AmanGRAD__${token}`
				}
			});
			if (data.message == "success") {
				toast.success("Book updated successfully");
			}
			setLoading(false);
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
		}
        navigate('/books')
	};

	const formik = useFormik({initialValues, onSubmit});

	const inputs = [
		{
			id: "isbn",
			type: "text",
			name: "isbn",
			title: "ISBN",
			value: formik.values.isbn
		},
		{
			id: "title",
			type: "text",
			name: "title",
			title: "Title",
			value: formik.values.title
		},
		{
			id: "price",
			type: "number",
			name: "price",
			title: "Price",
			value: formik.values.price
		},
		{
			id: "description",
			type: "textarea",
			name: "description",
			title: "Description",
			value: formik.values.description
		}, {
			id: "publishingHouse",
			type: "text",
			name: "publishingHouse",
			title: "Publishing House",
			value: formik.values.publishingHouse
		}, {
			id: "categoryName",
			type: "text",
			name: "categoryName",
			title: "Category Name",
			value: formik.values.categoryName
		}, {
			id: "image",
			type: "file",
			name: "image",
			title: "Image",
			onChange: handelFieldChange
		},
	];

	const renderInputs = inputs.map((input, index) => (
		<Input type={
				input.type
			}
			id={
				input.id
			}
			name={
				input.name
			}
			title={
				input.title
			}
			value={
				input.value
			}
			key={index}
			onChange={
				formik.handleChange || input.handelFieldChange
			}
			errors={
				formik.errors
			}
			onBlur={
				formik.handleBlur
			}
			touched={
				formik.touched
			}
			className="pb-4 pt-3"/>
	));

	const [imageUrl, setImageUrl] = useState(null);
	const fetchBook = async () => {
		try {
            setLoading(true);
			const {data} = await axios.get(`${
				import.meta.env.VITE_API_URL2
			}/book/${BookId}`);
			formik.setFieldValue("isbn", data.book.isbn);
			formik.setFieldValue("title", data.book.title);
			formik.setFieldValue("price", data.book.price);
			formik.setFieldValue("description", data.book.description);
			formik.setFieldValue("publishingHouse", data.book.publishingHouse);
			formik.setFieldValue("categoryName", data.book.categoryName);
			setImageUrl(data.book.image.secure_url);
            setLoading(false);
		} catch (err) {
			const {response} = err;
			if (response) {
				toast.error(response.data.message);
			} else {
				toast.error(error.message);
			}
            setLoading(false)
		} finally {
            setLoading(false)
        }
	};

	useEffect(() => {
		fetchBook();
	}, []);

	return (
		<div className="cssFix w-100"
			style={
				{
					background: "white",
					borderRadius: "18px"
				}
		}>
			{
			loading ? (
				<Loader/>) : (
				<>
					<h2 className="text-uppercase heading">UPDATE Book :</h2>
					<form onSubmit={
							formik.handleSubmit
						}
						style={
							styles.container
					}>
						<div className="d-flex align-items-center w-50">
							{
							imageUrl && (
								<img src={imageUrl}
									alt="book Image"
									style={
										{borderRadius: "50%"}
									}
									className="img-fluid w-50"/>
							)
						} </div>
						{renderInputs}
						<button type="submit"
							style={
								styles.button
							}
							disabled={
								! formik.isValid
						}>
							Update Book
						</button>
					</form>
				</>
			)
		} </div>
	);
};

const styles = {
	...commonStyles,
	textarea: {
		height: 120,
		resize: "vertical",
		paddingTop: "10px",
		borderRadius: 10
	}
};

export default UpdateBook;
