import React, { useEffect, useState } from 'react'
import SideBar from '../../../components/Sidebar';

import Link from 'next/link';

import Head from "next/head";
import IPcard from "../../../components/IPcard";
import useDataFetch from '../../../hooks/useDataFetch';
export default function List() {

    const labData = useDataFetch("/api/entrepreneur/lab/");
    
 
    return (
            <>
            <Head>
                <title>  Lab - List IP | Curltoon </title>
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
                          Home / Lab / Intellectual Property
                        </div>

                        <h3>  Intellectual Property </h3>
        
                        <div className="ipCardContainer d-flex">


                            <div className="row gx-3">

                            {labData.loaded && labData.data.length>0 ? <>    
                            <Link href={'/entrepreneur/lab/create'} passHref>
                                <a className="col-md-4">
                                    <IPcard title="Add new IP" description="Add new description" image="/ipAddCard.png"/>
                                </a>    
                            </Link> 

                            {labData.data.map((ip,index)=> 
                            <Link href={"/entrepreneur/lab/pipeline?id="+ip._id} key={index}>
                                <a className="col-md-4">
                                    <IPcard key={index} title={ip.title} description={ip.description} image={ip.image}/>
                                </a>
                            </Link>)}

                            </> : <>
                                <h4> Create your first Ip </h4>

                                <Link href={'/entrepreneur/lab/create'} passHref>
                                <button className="btn btn-primary">
                                    Create New IP
                                </button>
                                </Link>

                            </>}
                            </div>

                        </div>
                    
                    </div>

                </div>
            </div>
            </>
    )
}