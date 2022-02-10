import React, { useState } from 'react'
import IPcard from '../../../components/IPcard';
import SideBar from '../../../components/Sidebar';

import Link from 'next/link';
import IPFreelancersCard from '../../../components/IPFreelancersCard';
import Head from "next/head";
import { useRouter } from 'next/router';
import EntrepreneurSettingSidebar from '../../../components/EntrepreneurSettingSidebar';
import { useForm } from 'react-hook-form';
import Card from 'react-bootstrap/Card';

export default function CompanyProfile() {

    const [result, setResult] = useState("");
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => setResult(JSON.stringify(data));


     async function fetchCompany () {
        const res = await fetch("/api/entrepreneur/settings/company-profile", {
              credentials: 'include',
              method: 'GET', 
              headers: {
                  'Content-Type': 'application/json',
              }
          });
        
          console.log(res);
          console.log(res.json());
        // const data = await res.json();
        // if (!data.errors)
        // {
        //     console.log(data);
        //     // setIps(data);
        //     // setIpsLoaded(true);
        // }
    }

    fetchCompany();

    

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
                                <form onSubmit={handleSubmit(onSubmit)}>    
                                    <Card style={{boxShadow:'0px 4px 20px rgba(0, 0, 0, 0.1)'}}>
                                        <Card.Body>
                                            Company Profile
                                            <div>
                                                <img className="rounded-circle fw-300 me-2" style={{height:'50px',width:'50px'}} src="/freelancer2.jpg"></img>

                                                    <button className="btn btn-outline-primary me-2">Upload</button>
                                                    <button className="btn btn-outline-secondary">Remove</button>

                                            </div>
                                            <hr></hr>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="companyName" className="form-label text-muted">Company Name</label>
                                                    <input {...register("companyName")} className="form-control"></input>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="location" className="form-label text-muted">Location</label>
                                                    <input {...register("location")} className="form-control"></input>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="email" className="form-label text-muted"> Email Address</label>
                                                    <input {...register("email")} className="form-control"></input>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="phoneNumber" className="form-label text-muted">Contact Number</label>
                                                    <input {...register("phoneNumber")} className="form-control"></input>
                                                </div>
                                                <div className="mb-3 col-md-12">
                                                    <label htmlFor="description" className="form-label text-muted">Description</label>
                                                    <textarea {...register("description")} className="form-control"></textarea>
                                                </div>
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




