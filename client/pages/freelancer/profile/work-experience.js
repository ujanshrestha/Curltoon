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
import router from 'next/router';

export default function WorkExperience() {

    const access = useAccessCheck("freelancer");

    const [expObj, setExpObj] = useState({
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        stillWorking: false
    });

    const handleFormChange =  ( name, value )=> {
        console.log(name,value);
        setExpObj(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }


    // useEffect(()=>{
    //     if (userFetched && user && !formValuesLoaded){
    //         for (let key in userObj) {
    //             handleFormChange(key,user[`${key}`] ? user[`${key}`] : "");
    //         }
    //         setFormValuesLoaded(true);
    //     }
    // },[user,formValuesLoaded,userFetched]);

    const handleSubmit = e => {
        e.preventDefault();
   
        axios.post('/api/freelancer/profile/work-experience',
        //  {displayName,name,email,phoneNumber}
        expObj
        ) 
        .then(response =>
           { 
            console.log(response);
            if (response.status==200){
                alert("Work Experience Added");
                router.push('/freelancer/profile/freelancer-details');
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

                        <div> 
                         <Link href="/freelancer/profile/freelancer-details">  
                          <a><img src="/back_arrow.png"></img> </a>
                         </Link>
                            <h4> Work Experience </h4>
                        </div> 
                        
                        <div className="row">
                           
                            <div className="col-md-8 personalDetailColFreelancer mb-2">
                                
                                <form onSubmit={(e)=>handleSubmit(e)}>    
                                    <Card className="mb-2">
                                        <Card.Body>

                                            <div className="row">

                                                 <div className="mb-3 col-md-12">
                                                    <label htmlFor="position" className="form-label text-muted"> Position</label>
                                                    <input 
                                                    type="text"
                                                    name="position"
                                                    value={expObj.position}
                                                    onChange={(e)=>handleFormChange("position",e.target.value)}
                                                    className="form-control"></input>
                                                </div>
                                            
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label htmlFor="startDate" className="form-label text-muted">Start Date</label>
                                                    <input type="date" value={expObj.startDate}
                                                                                onChange={(e) => handleFormChange("startDate",e.target.value)}
                                                                                name="startDate"
                                                                                className="form-control" id="startDate"
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="endDate" className="form-label text-muted">End Date</label>
                                                    <input type="date" value={expObj.endDate}
                                                                                onChange={(e) => handleFormChange("endDate",e.target.value)}
                                                                                name="endDate"
                                                                                className="form-control" id="endDate"
                                                    />
                                                </div>
                                                <div className="col-md-2">
                                                    <label htmlFor="stillWorking">Still Working</label>
                                                    <input type="checkbox" value={expObj.stillWorking}
                                                    onChange={(e) => handleFormChange("stillWorking",e.target.checked)} />

                                                </div>
                                            </div>      

      

                                            <div className="row">
                                                <div className="col-md-12">
                                                <label htmlFor="description" className="form-label text-muted"> Description</label>
                                                    <input type="text" 
                                                    className="form-control"
                                                    name="description"
                                                    value={expObj.description}
                                                    onChange={(e)=>handleFormChange("description",e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                        </Card.Body>
                                    </Card>

                                    <button className="btn btn-primary"> Save changes</button>
                                </form>

                            </div>


                        </div>
                                      
                        
                    </div>

                </div>
              
            </div>

     
            </>
    )
}
}

