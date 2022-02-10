import React, { useContext, useEffect, useRef, useState } from 'react'


import Link from 'next/link';
import Head from "next/head";
import FreelancerSidebar from '../../../components/Freelancer/FreelancerSidebar';
import Card from 'react-bootstrap/Card';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import useAccessCheck from '../../../hooks/useAccessCheck';
import AccessNotAllowed from '../../../components/AccessNotAllowed';
import Loader from '../../../components/Loader';

export default function PersonalDetails() {



    const { user,userFetched, setUser } = useContext(UserContext);


    const access = useAccessCheck("freelancer");

    const fileInput = useRef();

    const [formValuesLoaded,setFormValuesLoaded] = useState(false);


    const [userObj, setUserObj] = useState({
        displayName: "",
        name: "",
        email: "",
        phoneNumber: "",
        fullAddress: "",
        description: ""
    });

    const handleFormChange =  ( name, value )=> {
        setUserObj(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }


    useEffect(()=>{
        if (userFetched && user && !formValuesLoaded){
            for (let key in userObj) {
                handleFormChange(key,user[`${key}`] ? user[`${key}`] : "");
            }
            setFormValuesLoaded(true);
        }
    },[user,formValuesLoaded,userFetched]);

    const handleSubmit = e => {
        e.preventDefault();
        let formData = new FormData();

        for (let key in userObj){
            formData.append(key,userObj[`${key}`]);
        }

        if (fileInput.current.files.length>0) formData.append("image",fileInput.current.files[0]);
   
        console.log("file check",fileInput.current.files.length);
        axios.post('/api/freelancer/profile/personal-details',
        //  {displayName,name,email,phoneNumber}
        formData
        ) 
        .then(response =>
           { 
            console.log(response);
            if (response.status==200){
                setUser(response.data.user);
                alert("User Profile updated successfully");
            }
           }
        );
    }

    if (access==null){
        return (<>
            <Loader /> 
        </>);
    }

    else if (access==false){
      return ( <AccessNotAllowed />);
    }

    else {
    return (
            <>
                <Head>
                    <title> Personal Details | Curltoon</title>
                    <meta name="description" content="Curltoon" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

            <div className="row bg-contentbgColor">
                <div className="p-0 sideBarContainer">
                <FreelancerSidebar />
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
                            Home / Profile / Personal Details
                        </div>
                        
                        <h4> Personal Details </h4>
                         
                        <div className="row">
                           
                            <div className="col-md-8 personalDetailColFreelancer mb-2">
                                
                                <form onSubmit={(e)=>handleSubmit(e)}>    
                                    <Card>
                                        <Card.Body>

                                            <div className="row">

                                                 <div className="mb-3 col-md-6">
                                                    <label htmlFor="name" className="form-label text-muted"> Name</label>
                                                    <input 
                                                    type="text"
                                                    name="name"
                                                    value={userObj.name}
                                                    onChange={(e)=>handleFormChange("name",e.target.value)}
                                                    className="form-control"></input>
                                                </div>

                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="displayName" className="form-label text-muted"> Display Name </label>
                                                    <input 
                                                    type="text"
                                                    name="displayName"
                                                    value={userObj.displayName}
                                                    onChange={(e)=>handleFormChange("displayName",e.target.value)}
                                                    className="form-control"></input>
                                                </div>
                                            
                                            </div>

                                            <div className="row">
                                            <div className="mb-3 col-md-12">
                                                    <label htmlFor="email" className="form-label text-muted"> Email</label>
                                                    <input 
                                                    type="email"
                                                    name="email"
                                                    value={userObj.email}
                                                    onChange={(e)=>handleFormChange("email",e.target.value)}
                                                    className="form-control"></input>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="phoneNumber" className="form-label text-muted"> Phone Number</label>
                                                    <input 
                                                    type="text"
                                                    name="phoneNumer"
                                                    value={userObj.phoneNumber}
                                                    onChange={(e)=>handleFormChange("phoneNumber",e.target.value)}
                                                    className="form-control"></input>
                                                </div>
                                
                                                {/* <div className="col-md-6">
                                                    <label htmlFor="country" className="form-label text-muted">Country</label>
                                                    <input {...register("country")} className="form-control"></input>
                                                </div> */}
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12">
                                                <label htmlFor="fullAddress" className="form-label text-muted"> Full Address</label>
                                                    <input type="text" 
                                                    className="form-control"
                                                    name="fullAddress"
                                                    value={userObj.fullAddress}
                                                    onChange={(e)=>handleFormChange("fullAddress",e.target.value)}
                                                    />
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col-md-12">
                                                <label htmlFor="description" className="form-label text-muted"> Description</label>
                                                    <input type="text" 
                                                    className="form-control"
                                                    name="description"
                                                    value={userObj.description}
                                                    onChange={(e)=>handleFormChange("description",e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                        </Card.Body>
                                    </Card>

                                    <button className="btn btn-primary"> Save changes</button>
                                </form>

                            </div>

                            <div className="col-md-4">
                                <Card>
                                    <Card.Body>

                                        {/* <img src="/freelancer1.jpg" className="w-100" style={{height:300}}/> */}
                                        {user && !user.image && <img className="w-20 mb-2" style={{height:'50px',width:'50px'}} src="/defaultprofilepic.png" /> }
                                        {user && user.image && <img className="w-100 mb-2" style={{height:300}} src={"/uploads/freelancer/"+user.image} /> }
                                        
                                        
                                        <input type="file" 
                                        ref={fileInput}
                                        className="form-control"/>

                                    </Card.Body>
                                </Card>
                            </div>

                        </div>
                                      
                        
                    </div>

                </div>
              
            </div>

     
            </>
    )
}
}

