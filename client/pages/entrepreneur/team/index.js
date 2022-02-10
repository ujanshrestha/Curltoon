import React, { useEffect, useState } from 'react'
import SideBar from '../../../components/Sidebar';

import Link from 'next/link';
import IPFreelancersCard from '../../../components/IPFreelancersCard';
import Head from "next/head";
import TeamCard from '../../../components/TeamCard';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import IPcard from '../../../components/IPcard';
import axios from 'axios';
import useDataFetch from '../../../hooks/useDataFetch';

export default function Team() {
  

    const [modalShow, setModalShow] = useState(false);
    const [result, setResult] = useState("");

    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () =>  setModalShow(true);

    const {data,error,loaded,setLoaded} = useDataFetch("/api/entrepreneur/team/");

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {

        axios.post('/api/entrepreneur/team/', data)
        .then(response =>
            //  this.setState({ articleId: response.data.id })
           { 
            console.log(response);
            if (response.status==200){
                handleModalClose();
                setLoaded(false);
            }
           }
        );

    }
    // setResult(JSON.stringify(data));

    return (
            <>
            <Head>
                <title> Team | Curltoon</title>
                <meta name="description" content="Curltoon" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="row bg-contentbgColor">
                <div className="p-0 sideBarContainer">
                <SideBar />
                </div>
                <div className="p-0 contentContainer">
                    <div className="searchContainer">

                            <div className="my-2">
                                <img src="/ipListSearchIcon.png" />
                                <input type="text" />
                                <button onClick={handleModalShow} className="btn btn-primary">Create New Team</button>
                            </div>
                            
                    </div>

                    <div className="p-3 bg-contentbgColor">

                        <div className="breadcrumbContainer text-muted">
                          Home / Team / Team List
                        </div>

                        <h3>  Team List </h3>


                        <div className="ipCardContainer d-flex">


                            <div className="row gx-3">

                            {loaded && data.length> 0 && data.map((team,index)=> 
                             <Link href={"/entrepreneur/team/subteams?id="+team._id} key={index}>
                                <a className="col-md-4" key={index}>
                                    <IPcard key={index} title={team.title} description={team.description} image={team.image}/>
                                </a>
                             </Link>
                            )}
                            </div>

                        </div>
                    
                  
                    
                    
                    </div>

                </div>
            </div>

            <Modal show={modalShow} onHide={handleModalClose}>
            <Modal.Header closeButton style={{border:'none'}}>
            <Modal.Title >
                            Create New Team
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label text-muted">Team Name</label>
                    <input {...register("title")} placeholder="Enter Team Title" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label text-muted">Brief Description</label>
                    <textarea {...register("description")} placeholder="Brief Description" className="form-control"/>
                </div>
                <button className="btn btn-primary">Create Team</button>
            </form>
                  
            </Modal.Body>
        
        </Modal>

        </>
    )
}
