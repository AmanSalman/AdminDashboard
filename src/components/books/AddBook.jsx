// import React, {useState} from 'react';
// import commonStyles from './commonStyles.js';
// import '../CSSFiles/general.css'
// import { useFormik } from 'formik';
// const AddBook = () => {
// 	const [isbn, setISBN] = useState('');
// 	const [title, setTitle] = useState('');
// 	const [price, setPrice] = useState('');
// 	const [description, setDescription] = useState('');
// 	const [publishingHouse, setPublishingHouse] = useState('');


//     const initialValues = {
//         isbn: '',
//           title: '',
//           price: '',
//           description:'',
//           publishingHouse:''
//     };
//     const onSubmit = async (book) =>{
//         console.log(book)
//         try {
            
//         } catch (error) {
            
//         }
//     }
//     const formik = useFormik({
//         initialValues,
//         onSubmit
//       });


// 	const handleAddBook = (e) => {
// 		e.preventDefault();
// 		if (!isbn.trim() || !title.trim() || !price.trim() || !description.trim() || !publishingHouse.trim()) {
// 			alert('Please fill in all fields');
// 			return;
// 		}
// 		alert(`Book "${title}" added successfully`);
// 		// Clear input fields after adding book
// 		setISBN('');
// 		setTitle('');
// 		setPrice('');
// 		setDescription('');
// 		setPublishingHouse('');
// 	};

// 	return (

// 		<div className='cssFix w-100'>

// 			<h2 className='text-uppercase heading text-dark'>ADD Book :</h2>


// 			<form onSubmit={formik.handleSubmit}
// 				style={
// 					styles.container
// 				}
// 				>
// 				<input type="text"
// 					value={formik.values.isbn}
// 					onChange={formik.handleChange}
// 					placeholder="ISBN"
// 					style={
// 						styles.input
// 					}
//                     id="isbn" name="isbn"/>
// 				<input type="text"
// 					value={formik.values.title}
// 					onChange={formik.handleChange}
// 					placeholder="Title"
// 					style={
// 						styles.input
// 					}
//                     id="title" name="title"
//                     />
// 				<input type="text"
// 					value={formik.values.price}
// 					onChange={formik.handleChange}
// 					placeholder="Price"
// 					style={
// 						styles.input
// 					}
//                     id="price" name="price"/>
// 				<input type="text"
// 					value={formik.values.publishingHouse}
// 					onChange={formik.handleChange}
// 					placeholder="Publishing House"
// 					style={
// 						styles.input
// 					}
//                     id="PublishingHouse" name="PublishingHouse"/>
// 				<textarea value={formik.values.description}
// 					onChange={formik.handleChange}
// 					placeholder="Description"
// 					style={
// 						{
// 							...styles.input,
// 							...styles.textarea
// 						}
// 					}
//                     id="Description" name="Description"
// 					// merge styles for textarea
// 				/>
// 				<button type="submit"
// 					style={
// 						styles.button
// 				}>Add Book</button>
// 			</form>
// 		</div>
// 	);
// };

// const styles = {
// 	...commonStyles,
// 	textarea: {
// 		height: 120, // adjust the height of the textarea
// 		resize: 'vertical', // allow vertical resizing
// 		paddingTop: '10px',
// 		borderRadius: 10
// 	}

// };

// export default AddBook;
import React, { useContext, useState } from 'react';
import commonStyles from './commonStyles.js';
import '../CSSFiles/general.css';
import { useFormik } from 'formik';
import axios from 'axios';
import Loader from '../Loader/Loader.jsx';
import { toast } from 'react-toastify';
import Input from '../shared/Input.jsx';
import { UserContext } from '../context/User.jsx';

const AddBook = () => {
    const [loading, setLoading] = useState(false);
    const {token} = useContext(UserContext)
    const initialValues = {
        isbn: '',
        title: '',
        price: 0,
        description: '',
        publishingHouse: '',
        categoryName:'',
        image:'',
    };

    const handelFieldChange = (event)=>{
        formik.setFieldValue('image', event.target.files[0]);
    }

    const onSubmit = async (book, { resetForm }) => {
        try {
            const formData = new FormData();
         formData.append("isbn",book.isbn);
         formData.append("title",book.title);
         formData.append("price",book.price);
         formData.append("image",book.image);
         formData.append("description",book.description);
         formData.append("publishingHouse",book.publishingHouse); 
         formData.append("categoryName",book.categoryName);

            setLoading(true);
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL2}/book/`, formData, 
            {headers:{Authorization: `AmanGRAD__${token}`}}
        );
            if (data.message == 'success') {
				toast.success("Added successfully");
                resetForm();
				setLoading(false);
			}
            setLoading(false)
        } catch (error) {
            setLoading(false)
            const {response} = error;
            toast.error(response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit
    });


    const inputs = [
        {
            id:'isbn',
            type:'text',
            name:'isbn',
            title:'Isbn',
            value:formik.values.isbn,
            required:true
        },
        {
            id:'title',
            type:'text',
            name:'title',
            title:'Title',
            value:formik.values.title,
            required:true
        },
        {
            id:'price',
            type:'number',
            name:'price',
            title:'Price',
            value:formik.values.price,
            required:true
        },
        // {
        //     id:'description',
        //     type:'textarea',
        //     name:'description',
        //     title:'description',
        //     value:formik.values.description,
        // },
        {
            id:'publishingHouse',
            type:'text',
            name:'publishingHouse',
            title:'Publishing House',
            value:formik.values.publishingHouse,
            required:true
        },
        {
            id:'categoryName',
            type:'text',
            name:'categoryName',
            title:'Category Name',
            value:formik.values.categoryName,
            required:true
        },
        {
            id:'image',
            type:'file',
            name:'image',
            title:'Image',
            onChange:handelFieldChange,
            required:true,
            
        }
    ]

    
    const renderInputs = inputs.map ((input,index)=>
    <Input type={input.type}
     id={input.id}
      name={input.name} 
      title={input.title}
       value={input.value}  
       key={index}
     onChange={input.onChange || formik.handleChange} 
     errors={formik.errors}
     onBlur={formik.handleBlur} 
     touched={formik.touched}
     required
     className= 'pb-4 pt-3'
     />
    )

    if(loading){
        return <Loader/>
    }

    return (

        <>
         <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            Pages
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Book
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Book
          </li>
        </ol>
      </nav>
        <div className='cssFix w-100 border' style={{background: 'white',
        borderRadius: '18px'}}>
            <form onSubmit={formik.handleSubmit} style={styles.container} encType='multipart/form-data'>
                {renderInputs}
                <textarea
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    placeholder="Description"
                    style={{ ...styles.input, ...styles.textarea }}
                    id="description"
                    name="description"
                />
                <button type="submit" style={styles.button} disabled={!formik.isValid}>Add Book</button>
            </form>
        </div>
        </>
    );
};

const styles = {
    ...commonStyles,
    textarea: {
        height: 120,
        resize: 'vertical',
        paddingTop: '10px',
        borderRadius: 10
    }
};

export default AddBook; 