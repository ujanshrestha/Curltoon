import React, { useContext, useEffect, useRef, useState } from 'react'
import IPcard from '../../../components/IPcard';
import SideBar from '../../../components/Sidebar';

import Link from 'next/link';
import IPFreelancersCard from '../../../components/IPFreelancersCard';
import Head from "next/head";
import { useRouter } from 'next/router';
import EntrepreneurSettingSidebar from '../../../components/EntrepreneurSettingSidebar';
import Card from 'react-bootstrap/Card';
import { useForm } from "react-hook-form";
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';

export default function UserProfile() {
    
    const { user } = useContext(UserContext);

    const [formValuesLoaded,setFormValuesLoaded] = useState(false);

    const fileInput = useRef();
    const [displayName,setDisplayName] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("displayName",displayName);
        formData.append("name",name);
        formData.append("email",email);
        formData.append("phoneNumber",phoneNumber);

        if (fileInput.current.files.length>0) formData.append("image",fileInput.current.files[0]);
        
        // console.log("file check",fileInput.current.files.length);
        axios.post('/api/entrepreneur/settings/user-profile',
        //  {displayName,name,email,phoneNumber}
        formData
        )
        .then(response =>
           { 
            console.log(response);
            if (response.status==200){
                alert("User Profile updated successfully");
            }
           }
        );
    }

    useEffect(()=>{
        if (user && !formValuesLoaded){
            setName(user.name);
            setEmail(user.email);
            setPhoneNumber(user.phoneNumber);
            setDisplayName(user.displayName ? user.displayName : "");
            setFormValuesLoaded(true);
        }
    },[user,formValuesLoaded])

   

    return (
            <>
                <Head>
                    <title> Settings | Curltoon</title>
                    <meta name="description" content="Curltoon" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

            <div className="row bg-contentbgColor">
                <div className="p-0 sideBarContainer">
                <SideBar />
                </div>

                <div className="contentContainer p-0">
                  
                <div className="searchContainer">

                    <div className="my-2">
                        <img src="/ipListSearchIcon.png" />
                        <input type="text" />
                    </div>

                    </div>



                    <div className="p-3 bg-contentbgColor">

                        <div className="breadcrumbContainer text-muted">
                        Home / Settings / User Profile
                        </div>
                        
                        <h3> Settings </h3>

                        <div className="settingsContainer row">

                                <div className="col-md-3">
                                    <EntrepreneurSettingSidebar />
                                </div>


                                <div className="col-md-7">
                                <form onSubmit={(e)=>handleSubmit(e)}>    
                                    <Card style={{boxShadow:'0px 4px 20px rgba(0, 0, 0, 0.1)'}}>
                                        <Card.Body>
                                            User Profile
                                            <div>
                                                {user && user.image && <img className="rounded-circle fw-300 me-2" style={{height:'50px',width:'50px'}}src={"/uploads/entrepreneur/" + user.image} /> }
                                                
                                                {user && !user.image &&  <img className="rounded-circle fw-300 me-2" style={{height:'50px',width:'50px'}} src="/defaultprofilepic.png"></img>}
                                                
                                               
                                                    <div className="col-3">
                                                        <input type="file" 
                                                        ref={fileInput}
                                                        // className="form-control"
                                                        />    
                                                    </div>
                                                    {/* <span className="btn btn-outline-primary me-2">
                                                        Upload
                                                    </span> */}
                                                    {/* <span className="btn btn-outline-secondary">Remove</span> */}

                                            </div>
                                            <hr></hr>
                                            <div className="row">

                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="displayName" className="form-label text-muted"> Display Name </label>
                                                    <input 
                                                    type="text"
                                                    value={displayName}
                                                    onChange={(e)=>setDisplayName(e.target.value)}
                                                    className="form-control"></input>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="name" className="form-label text-muted"> Name</label>
                                                    <input 
                                                    type="text"
                                                    value={name}
                                                    onChange={(e)=>setName(e.target.value)}
                                                    className="form-control"></input>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="email" className="form-label text-muted"> Email</label>
                                                    <input 
                                                    type="email"
                                                    value={email}
                                                    onChange={(e)=>setEmail(e.target.value)}
                                                    className="form-control"></input>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="phoneNumber" className="form-label text-muted"> Phone Number</label>
                                                    <input 
                                                    type="text"
                                                    value={phoneNumber}
                                                    onChange={(e)=>setPhoneNumber(e.target.value)}
                                                    className="form-control"></input>
                                                </div>
                                                {/* <div className="mb-3 col-md-6">
                                                    <label htmlFor="fullName" className="form-label text-muted">Full Name</label>
                                                    <input {...register("name")} className="form-control"></input>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="email" className="form-label text-muted"> Email</label>
                                                    <input {...register("email")} className="form-control"></input>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="phoneNumber" className="form-label text-muted">Phone Number</label>
                                                    <input {...register("phoneNumber")} className="form-control"></input>
                                                </div> */}
                                            </div>
                                            <hr></hr>
                                            <div className="row">
                                                <h6>Link Account</h6>
                                                <div>
                                                    <span className="text-muted me-3">
                                                        We used to sign in and populate your profile information.
                                                    </span>
                                                    <button className="btn btn-outline-primary ms-2">
                                                            Connect
                                                    </button>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="row">
                                                <h6>Delete Account</h6>
                                                <div>
                                                    <span className="text-muted me-3">
                                                       By deleting your account you will lose all your data
                                                    </span>
                                                    <button className="btn btn-outline-secondary ms-2">
                                                            Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    <button className="btn btn-primary mt-2">
                                        Save Changes
                                    </button>
                                </form>
                                </div>



                        </div>                        
                        
                    </div>

                </div>
              
            </div>

     
            </>
    )
}




