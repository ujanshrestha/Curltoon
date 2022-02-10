import React, { useEffect, useState } from 'react'
import SideBar from '../../../components/Sidebar';

import Link from 'next/link';
import IPFreelancersCard from '../../../components/IPFreelancersCard';
import Head from "next/head";
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

export default function ProjectCard() {
    const router = useRouter();
    const {id} = router.query;

    const [pipelines,setPipelines] = useState([]);
    const [pipelinesLoaded,setPipelinesLoaded] = useState(false);

    console.log(id);

    const [infoModalShow, setInfoModalShow] = useState(false);

    const handleInfoModalClose = () => setInfoModalShow(false);
    const handleInfoModalShow = () =>  setInfoModalShow(true);

    const [result, setResult] = useState("");

    const { register, handleSubmit } = useForm();
  
  
    // const [linkCount,setLinkCount] = useState(1);
  
    const onSubmit = (data) => {
        // console.log(data);
        setResult(JSON.stringify(data));
    }

    async function fetchPipelines () {
        const res = await fetch("/api/entrepreneur/project/"+id+"/pipeline-list", {
              credentials: 'include',
              method: 'GET', 
              headers: {
                  'Content-Type': 'application/json',
              }
          });
        // console.log(res);
        // if (res.status==200){
            const data = await res.json();
            console.log(data);
            if (!data.errors)
            {
                setPipelines(data);
                setPipelinesLoaded(true);
            }
        // }
        // else {
        //     setPipelinesLoaded(true);
        // }

    }

    useEffect(()=>{
        if (!pipelinesLoaded && id){
            fetchPipelines();
        }

    },[pipelinesLoaded,id]);
  


    return (
            <>
                <Head>
                    <title> Studio - Project Card | Curltoon</title>
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
                            </div>
                    
                    </div>



                    <div className="p-3 bg-contentbgColor">

                        <div className="breadcrumbContainer text-muted">
                          Home / Studio / Project title
                        </div>

                        <h3>  Project 1 </h3>

                        <div className="ipStagingContainer bg-primary bg-gradient rounded d-flex align-items-center justify-content-between">
                            {stageBannerValues.map((stageBannerValue,stageBannerIndex)=><div
                            className="p-3 border-end"
                            role="button"
                            onClick={handleInfoModalShow}
                            key={stageBannerIndex}
                            >
                                {stageBannerValue.value}
                                <span className="d-block fw-100 opacity-75">  {stageBannerValue.label} </span>


                                </div>)}
                        </div>

                           
                            <div className="serviceCardsContainer d-flex mt-2 w-100"
                            >
                            
                                    {pipelinesLoaded && pipelines.length>0 && pipelines.map((pipeline,index)=>
                                    <IPFreelancersCard
                                    key={index}  image="" title={pipeline.pipelineStep.name} value="" />
                                    )}

                                    {pipelinesLoaded && pipelines.length==0 && <>
                                    Project not found
                                    </>}


                            </div>
                  
                    
                    
                    </div>

                </div>
            </div>


        <Modal show={infoModalShow} onHide={handleInfoModalClose}>
            <Modal.Header closeButton style={{border:'none'}}>
            <Modal.Title >
              Project Staging
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <form onSubmit={handleSubmit(onSubmit)}>  
              
                <div className="mb-3">
                                                        <label htmlFor="stage" className="form-label text-muted">Stage</label>
                                                        <select {...register("stage")} className="form-control">
                                                                                <option value="">Stage</option>
                                                                                {projectStages.map((p,index)=> 
                                                                                <option key={index} value={p.value}>{p.label}</option>
                                                                                )}
                                                        </select>
                </div>

                <div className="mb-3">
                                <label htmlFor="currentStageDueDate" className="form-label text-muted">Current Stage Due Date</label>
                                <input {...register("currentStageDueDate")} className="form-control"/>
                </div>

                <div className="mb-3">
                                <label htmlFor="currentStageFreelancer" className="form-label text-muted">Current Stage Freelancer</label>
                                <input {...register("currentStageFreelancer")} className="form-control"/>
                </div>

                <div className="mb-3">
                                <label htmlFor="totalBudget" className="form-label text-muted">Total Budget</label>
                                <input {...register("totalBudget")} className="form-control"/>
                </div>

                <div className="mb-3">
                                <label htmlFor="dueDate" className="form-label text-muted">Due Date</label>
                                <input {...register("dueDate")} className="form-control"/>
                </div>

                <button className="btn btn-primary">
                    Save
                </button>


            </form>

                   

                

            </Modal.Body>
        
        </Modal>

     
            </>
    )
}

const stageBannerValues = [
    {"label": "Current Stage","value":""},
    {"label": "Current Stage Due Date","value":""},
    {"label": "Current Stage Freelancer","value":""},
    {"label": "Total Budget","value":""},
    {"label": "Due Date","value":""}
]

const projectStages = [
    {"label":"Processing","value":"processing"},
    {"label":"Packaging","value":"packaging"},
]