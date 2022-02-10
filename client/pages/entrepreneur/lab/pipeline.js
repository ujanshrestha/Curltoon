import React, { useEffect, useState } from 'react'
import IPcard from '../../../components/IPcard';
import SideBar from '../../../components/Sidebar';

import Link from 'next/link';
import IPFreelancersCard from '../../../components/IPFreelancersCard';
import Head from "next/head";

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import IpPipelineStage from '../../../components/IpPipelineStage';

export default function Pipeline() {
    const router = useRouter();
    const {id} = router.query;

    const [teams,setTeams] = useState([]);
    const [teamsLoaded,setTeamsLoaded] = useState(false);

    // localhost:5000/api/entrepreneur/lab/staging/

    async function fetchTeams () {
        const res = await fetch("/api/entrepreneur/lab/team/"+ id, {
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

    useEffect(()=>{
        if (!teamsLoaded && id){
            fetchTeams();
        }

    },[teamsLoaded,id]);



    // if (Object.keys(currentStage).length === 0)
    // {
    //     console.log("empty stage");
    // }

    return (
            <>
                <Head>
                    <title> Lab - Service Card | Curltoon</title>
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
                          Home / Lab / Intellectual Property
                        </div>

                        <h3>  Intellectual Property </h3>
                     
                            <IpPipelineStage id={id} />
                           
                            <div className="serviceCardsContainer d-flex mt-2 w-100"
                            >

                                    {teamsLoaded && teams.length>0 && teams.map((team,index)=>
                                    <IPFreelancersCard
                                        key={index} 
                                        team={team}
                                         value="" />
                                    )}


                            </div>
                  
                    
                    
                    </div>

                </div>
            </div>

    

     
            </>
    )
}