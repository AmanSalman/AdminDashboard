import React from 'react'
import { useFormik } from 'formik';
import Input from '../../pages/Input';
import { registerSchema } from '../validation/validate.js';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


export default function AddCategory() {


    const initialValues= {
        userName:'',
        email:'',
        password:'',
        image:'',
    };

    const handelFieldChange = (event)=>{
        formik.setFieldValue('image', event.target.files[0]);
    }

    const onSubmit = async (users) => {
        // console.log(users);
        // we used formData cuz we have here image.
         const formData = new FormData();
         formData.append("userName",users.userName);
         formData.append("email",users.email);
         formData.append("password",users.password);
         formData.append("image",users.image);
        //  for(let data of formData.entries()){
        //     console.log(data)
        //  }

         const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`,formData);
         if (data.message == 'success'){
            toast.success('Account created successfully, please verify your email to login', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
         }

    }
    const formik = useFormik ({
        initialValues,
        onSubmit,
        validationSchema:registerSchema
        // validate:values=>{
        //     let errors  = {};
        //     if (!values.userName){
        //         errors.userName = "username is required";
        //     }
        //     if(!values.email){
        //         errors.email = "email is required";
        //     }
        //     if(!values.password){
        //         errors.password = "password is required";
        //     }
        //     return errors;
        // }
    });

    const inputs = [
        {
            id:'username',
            type:'text',
            name:'userName',
            title:'user name',
            value:formik.values.userName,
        },
        {
            id:'email',
            type:'email',
            name:'email',
            title:'user email',
            value:formik.values.email,
        },
        {
            id:'password',
            type:'password',
            name:'password',
            title:'user password',
            value:formik.values.password,
        },
        {
            id:'image',
            type:'file',
            name:'image',
            title:'user image',
            onchange:handelFieldChange
        }
    ]

    
    const renderInputs = inputs.map ((input,index)=>
    <Input type={input.type}
     id={input.id}
      name={input.name} 
      title={input.title}
       value={input.value}  
       key={index}
     onChange={input.onchange|| formik.handleChange} 
     errors={formik.errors}
     onBlur={formik.handleBlur} 
     touched={formik.touched}/>
    )
    
  return (
    
    <div className=' container'>
         <h1 className=' bordercolor mb-4 pb-1 ourProducts fw-bold'>Create Account:</h1>
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data' className=' d-flex  flex-column align-items-center justify-content-center'>
        {renderInputs}
        <button type='submit' className='rounded-3 text-decoration-none  fw-bold mb-3 p-2 border btn btn-custom  width-btn px-5' disabled={!formik.isValid}>Register</button>
        </form>
    </div>

  )
}