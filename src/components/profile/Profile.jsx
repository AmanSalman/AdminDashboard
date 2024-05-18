import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Profile.css'; // Import your CSS file
import Loader from '../Loader/Loader.jsx';
import { UserContext } from '../context/User.jsx';
import { Link } from 'react-router-dom';

const Profile = () => {
  const userData = {
    name:'Aman Salman',
    email:'AmanSalman@gmail.com',
    phone:'+970 594580633',
    status:'Active',
  }
 

  return (

    <>
    <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item active" aria-current="page">Profile</li>
    <li className="breadcrumb-item active" aria-current="page">information</li>
  </ol>
</nav>
   <div className="container rounded bg-white mb-5">
    <div className="row">
    <div className="col-md-3 border-right">
      <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span className="font-weight-bold">{userData.name}</span><span className="text-black-50">{userData.email}</span><span> </span></div>
    </div>
    <div className="col-md-5 border-right">
      <div className="p-3 py-5">
        <div className="row mt-2">
          <div className="col-md-6"><label className="labels">Username</label><input type="text" className="form-control" value={userData.name} readOnly /></div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" readOnly value={userData.phone} /></div>
          <div className="col-md-12"><label className="labels">Status</label><input type="text" className="form-control" defaultValue readOnly value={userData.status}/></div>
          <div className="col-md-12"><label className="labels">Email</label><input type="text" className="form-control" placeholder="enter email id" readOnly value={userData.email} /></div>
        </div>
        <div className="text-center mt-1"><Link className="btn profile-button" to={'/Editprofile'}>Update Profile</Link></div>
      </div>
    </div>
  </div>

</div>
    </>

  );
};

export default Profile;

