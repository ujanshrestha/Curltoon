import React, { useEffect, useState } from 'react'
import IPcard from '../../../components/IPcard';
import SideBar from '../../../components/Sidebar';

import Link from 'next/link';

import Head from "next/head";
import useDataFetch from '../../../hooks/useDataFetch';


export default function List() {

    const {data,error,loaded} = useDataFetch("/api/entrepreneur/project");
    
    return (
            <>
            <Head>
                <title>  Studio - Projects | Curltoon </title>
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



                    <div className="ipBodyContainer p-3">

                        <div className="breadcrumbContainer text-muted">
                          Home / Studio / Projects
                        </div>

                        <h3>  Projects </h3>
        
                        <div className="ipCardContainer d-flex">

                            <div className="row gx-3">

                            <Link href={'/entrepreneur/studio/pipelines'} passHref>
                                <a className="col-md-4">
                                <IPcard title="Add new Project" description={ <> <i class="bi bi-people-fill"></i> 0 Members </>} image="/ipAddCard.png"/>
                                </a>    
                            </Link> 
                            
                            {loaded && data.length> 0 && data.map((project,index)=> 
                            <Link href={"/entrepreneur/studio/projectcard?id="+project._id}>
                                <a className="col-md-4">
                                    <IPcard key={index} title={project.title} description={project.description} image={project.image}/>
                                </a>
                            </Link>)}
                            </div>

                        </div>
                    
                    </div>

                </div>
            </div>
            </>
    )
}