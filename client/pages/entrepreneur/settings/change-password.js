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
import axios from 'axios';

export default function ChangePassword() {
    const [result, setResult] = useState("");
    const { register, handleSubmit } = useForm();
    const history = useRouter();

    const onSubmit = (data) => {
        console.log(data);
        if (data.newPassword != data.confirmNewPassword){
            alert("passwords don't match");
        }
        else {
            axios.post('/api/users/settings/change-password', data)
            .then(response =>
                //  this.setState({ articleId: response.data.id })
               {   
                    if (response.status==200){
                        alert("password changed successfully");
                        history.push('/');
                    }
                    else {
                        alert("an error occured");
                    }
               }
                ).catch(err => {
                    console.log(err);
                })
        }
    };

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
                                            <span>Change Password</span>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <label htmlFor="oldPassword" className="form-label text-muted">Old Password</label>
                                                    <input {...register("oldPassword")} type="password" className="form-control"></input>
                                                </div>
                                                <div className="col-md-12">
                                                    <label htmlFor="newPassword" className="form-label text-muted">New Password</label>
                                                    <input {...register("newPassword")} type="password" className="form-control"></input>
                                                </div>
                                                <div className="col-md-12">
                                                    <label htmlFor="confirmPassword" className="form-label text-muted">Confirm Password</label>
                                                    <input {...register("confirmNewPassword")} type="password" className="form-control"></input>
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




