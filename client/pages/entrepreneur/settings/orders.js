import React, { useState } from 'react'
import IPcard from '../../../components/IPcard';
import SideBar from '../../../components/Sidebar';

import Link from 'next/link';
import IPFreelancersCard from '../../../components/IPFreelancersCard';
import Head from "next/head";
import { useRouter } from 'next/router';
import EntrepreneurSettingSidebar from '../../../components/EntrepreneurSettingSidebar';
import Card from 'react-bootstrap/Card';
import { useForm } from "react-hook-form";

export default function Orders() {
    const [result, setResult] = useState("");
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => setResult(JSON.stringify(data));


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
                                            <div> Billing & Payment</div>
                                            <span className="text-muted"> Lorem ipsum</span>
                                            <hr></hr>
                                            <div className="row">
                                                <span>Billing Info: </span>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="fullName" className="form-label text-muted">Full Name</label>
                                                    <input {...register("fullName")} className="form-control"></input>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="billingAddress" className="form-label text-muted">Billing Address</label>
                                                    <input {...register("billingAddress")} className="form-control"></input>
                                                </div>
                                                <div className="mb-3 col-md-3">
                                                    <label htmlFor="city" className="form-label text-muted"> City</label>
                                                    <input {...register("city")} className="form-control"></input>
                                                </div>
                                                <div className="mb-3 col-md-3">
                                                    <label htmlFor="zipCode" className="form-label text-muted"> Zip Code</label>
                                                    <input {...register("zipCode")} className="form-control"></input>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="country" className="form-label text-muted">Country</label>
                                                    <input {...register("country")} className="form-control"></input>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="row">
                                                <span>Billing Info:</span>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="cardHoldersName" className="form-label text-muted">Card Holder's Name</label>
                                                    <input {...register("cardHoldersName")} className="form-control"></input>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="cardNumber" className="form-label text-muted">Card Number</label>
                                                    <input {...register("cardNumber")} className="form-control"></input>
                                                </div>
                                                <div className="mb-3 col-md-3">
                                                    <label htmlFor="expMonth" className="form-label text-muted"> Exp Month</label>
                                                    <input {...register("expMonth")} className="form-control"></input>
                                                </div>
                                                <div className="mb-3 col-md-3">
                                                    <label htmlFor="expYear" className="form-label text-muted"> Exp Year</label>
                                                    <input {...register("expYear")} className="form-control"></input>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="cvcNumber" className="form-label text-muted">CVC Number</label>
                                                    <input {...register("cvcNumber")} className="form-control"></input>
                                                </div>
                                               
                                            </div>
                                            <hr></hr>
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




