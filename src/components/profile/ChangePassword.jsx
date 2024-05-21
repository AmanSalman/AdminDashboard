import React, { useContext, useState } from "react";
import { UserContext } from "../context/User.jsx";
import { useFormik } from "formik";
import Input from "../shared/Input.jsx";
import commonStyles from "../shared/commonStyles.js";
import "./Profile.css";
import { toast } from "react-toastify";
import axios from "axios";

function ChangePassword() {
  const { token } = useContext(UserContext);
  const [loading, setLoading] = useState(false)
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  const [changesMade, setChangesMade] = useState(false); // State to track changes

  const onSubmit = async (values) => {
    setLoading(true);
        try {
          if(values.newPassword !== values.confirmNewPassword){
            toast.error("Passwords do not match");
            setLoading(false);
            return;
          }
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL2}/auth/changePassword`, values, {
                headers: { Authorization: `AmanGRAD__${token}` },
            });
            setLoading(false);
            console.log(data)
            if(data.message == 'success') {
                toast.success("Updated successfully");
            }
        } catch (error) {
            const {response} = error;
            toast.error(response?.data?.message || "Failed to change password");
            console.error(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
        navigate('/profile')
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const handleInputChange = (e) => {
    formik.handleChange(e);
    setChangesMade(true); // Set changes made to true whenever input changes
  };

  const inputConfigurations = [
    {
      id: "oldPassword",
      title: "Old Password",
      type: "password",
      name: "oldPassword",
      required: true,
    },
    {
      id: "newPassword",
      title: "New Password",
      type: "password",
      name: "newPassword",
      required: true,
    },
    {
      id: "confirmNewPassword",
      title: "Confirm New Password",
      type: "password",
      name: "confirmNewPassword",
      required: true,
    },
  ];

  return (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page">
          Profile
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Edit
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Change Password
        </li>
      </ol>
      <div className="profile-container">
        <form
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
          className=""
        >
          {/* Render inputs based on inputConfigurations array */}
          {inputConfigurations.map((input) => (
            <Input
              key={input.id}
              id={input.id}
              title={input.title}
              type={input.type}
              name={input.name}
              value={formik.values[input.name]}
              onChange={handleInputChange} // Change to handleInputChange
              onBlur={formik.handleBlur}
              errors={formik.errors}
              required={input.required}
            />
          ))}
          {/* Show the button only when changes are made */}
          {changesMade && (
            <button
              type="submit"
              className="button"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
}

const styles = {
  ...commonStyles,
};

export default ChangePassword;
