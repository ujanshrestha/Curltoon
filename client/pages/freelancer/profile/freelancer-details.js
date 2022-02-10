import React, { useContext, useState } from 'react'


import Link from 'next/link';
import Head from "next/head";
import FreelancerSidebar from '../../../components/Freelancer/FreelancerSidebar';
import Card from 'react-bootstrap/Card';
import { useForm } from 'react-hook-form';
import WorkHistory from '../../../components/Freelancer/WorkHistory';
import EducationList from '../../../components/Freelancer/EducationList';
import { UserContext } from '../../../context/UserContext';

export default function FreelancerDetails() {


    const {user} = useContext(UserContext);
    

    return (
            <>
            <Head>
                <title> Freelancer Details | Curltoon</title>
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
                        
                        <h4> Freelancer Details </h4>
                         
                        <div className="row">
                           
                            <div className="col-md-12">
                                
                                    <Card className="mb-2">
                                        <Card.Body>

                                            <div className="row">
                                                <div className="col-md-2">
                                                    {user && !user.image && <img className="rounded-circle fw-300 me-2" style={{height:'50px',width:'50px'}} src="/defaultprofilepic.png" /> }
                                                    {user && user.image && <img className="rounded-circle fw-300 me-2" style={{height:'50px',width:'50px'}} src={"/uploads/freelancer/"+user.image} /> }
                                                
                                                </div>
                                                <div className="col-md-5">
                                                   <div> {user && user.name}</div>
                                                   <div className="text-muted"> Artist, Songwriter </div>
                                                   <div className="text-muted"> {user && user.fullAddress && user.fullAddress} </div>

                                                </div>
                                                <div className="col-md-3">
                                                    $50.0/hr
                                                </div>

                                            </div>  
                                            <hr></hr>

                                            <div className="row" >
                                                <div className="col-md-3" style={{
                                                    borderRight: '1px solid #ccc'
                                                }}>
                                                    <div className="fw-bold">
                                                        Availability
                                                    </div>
                                                    <div className="fw-bold">
                                                        Available
                                                    </div>
                                                    <div className="text-muted">
                                                        More than 20hrs/week
                                                    </div>


                                                    <div className="fw-bold">
                                                        Language
                                                    </div>
                                                    <div>
                                                    <span className="fw-bold">English </span> 
                                                    <span className="text-muted"> Fluent </span> 
                                                        
                                                    </div>

                                                </div>
                                                <div className="col-md-9">
                                                    <div>
                                                        <p>
                                                            {user && user.description}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <div className="fw-bold">
                                                            Skills
                                                        </div>

                                                        <div className="d-flex">
                                                            <span className="me-2 badge bg-secondary">
                                                                Adobe XD
                                                            </span>
                                                            <label className="me-2 badge bg-secondary">
                                                                Illustrator
                                                            </label> 
                                                            <label className="me-2 badge bg-secondary">
                                                                Photoshop
                                                            </label>
                                                        </div>

                                                    </div>
                                                    
                                                </div>
                                            </div>



                                        </Card.Body>
                                    </Card>


                                    <WorkHistory />           

                                    <EducationList />

                                    <Card className="mb-2">
                                        <Card.Body>
                                        <div className="row d-flex">
                                                <div className="col-md-9">
                                                    <span className="fw-bold"> Testimonials</span>
                                                </div>
                                                <div className="col-md-3">
                                                    <span role="button"><img src="/add_icon.png" style={{
                                                        borderRadius:'50%',
                                                        border: '1px solid blue'
                                                    }}></img></span>
                                                </div>
                                            </div>
                                            <hr></hr>

                                            <div className="row">
                                                <span className="text-muted"> Employment history </span>
                                            </div>
                                        </Card.Body>
                                    </Card>

                                    <Card className="mb-2">
                                        <Card.Body>
                                        <div className="row d-flex">
                                                <div className="col-md-9">
                                                    <span className="fw-bold"> Other Experiences </span>
                                                </div>
                                                <div className="col-md-3">
                                                    <span role="button"><img src="/add_icon.png" style={{
                                                        borderRadius:'50%',
                                                        border: '1px solid blue'
                                                    }}></img></span>
                                                </div>
                                            </div>
                                            <hr></hr>

                                            <div className="row">
                                                <span className="text-muted"> No items to display</span>
                                            </div>
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

