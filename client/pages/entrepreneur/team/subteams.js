import React, { useEffect, useState } from 'react'
import SideBar from '../../../components/Sidebar';

import Link from 'next/link';
import IPFreelancersCard from '../../../components/IPFreelancersCard';
import Head from "next/head";
import TeamCard from '../../../components/TeamCard';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function SubTeams() {
  


    const router = useRouter();
    const {id} = router.query;


    const [modalShow, setModalShow] = useState(false);
    const [result, setResult] = useState("");

    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () =>  setModalShow(true);



    const { register, handleSubmit } = useForm();


    const [teams,setTeams] = useState([]);
    const [teamsLoaded,setTeamsLoaded] = useState(false);

    async function fetchTeams () {
        const res = await fetch("/api/entrepreneur/team/"+id, {
              credentials: 'include',
              method: 'GET', 
              headers: {
                  'Content-Type': 'application/json',
              }
          });
        const data = await res.json();
        if (!data.errors)
        {
            setTeams(data);
            setTeamsLoaded(true);
        }
    }

    useEffect(()=> {
        if (!teamsLoaded && id ){
            fetchTeams();
        }
    },[teamsLoaded,id]);

    const onSubmit = (data) => {

        data.entrepreneurteam = id; 

        console.log("asda",data);
        axios.post('/api/entrepreneur/team/subteam', data)
        .then(response =>
           { 
            console.log(response);
            if (response.status==200){
                handleModalClose();
                setTeamsLoaded(false);
            }
           }
        );

    }


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
                                <button onClick={handleModalShow} className="btn btn-primary">Create New Sub Team</button>
                            </div>
                            
                    
                    </div>



                    <div className="p-3 bg-contentbgColor">

                        <div className="breadcrumbContainer text-muted">
                          Home / Team / Team List
                        </div>

                        <h3>  Team List </h3>


                        
                        <div className="serviceCardsContainer d-flex mt-2 w-100"
                        >
                        
                                {teamsLoaded && teams.length>0 && teams.map((team,index)=>
                                <TeamCard
                                key={index}  image="" title={team.title} value="" />
                                )}

                                {teamsLoaded && teams.length==0 && <>
                                    No sub teams for team
                                </>}


                        </div>
                  
                    
                    
                    </div>

                </div>
            </div>

        <Modal show={modalShow} onHide={handleModalClose}>
            <Modal.Header closeButton style={{border:'none'}}>
            <Modal.Title >
                            Create New Sub Team
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
                <button className="btn btn-primary">Create Sub Team</button>
            </form>
                  

              

            </Modal.Body>
        
        </Modal>

            

     
            </>
    )
}

const stageBannerValues = [
    {"label": "Current Stage","value":"Processing"},
    {"label": "Current Stage Due Date","value":"9/11/2020"},
    {"label": "Current Stage Freelancer","value":"Jerome Bell"},
    {"label": "Total Budget","value":"$10,000"},
    {"label": "Due Date","value":"9/12/2020"}
]
const serviceTypeValues = [
    {"title": "Episodic Character Design", "value": "characterdesign",'image':"/ipImg1.jpg"},
    {"title": "Location Design", "value": "locationdesign","image":"/studio/studioCard1.png"},
    {"title": "Song Writer", "value": "songwriter","image":"/studio/studioCard4.png"}
]
