import React, { useState } from 'react'
import IPcard from '../../../components/IPcard';
import SideBar from '../../../components/Sidebar';

import Link from 'next/link';
import Head from "next/head";

export default function Catalogue() {
    

    return (
            <>
                <Head>
                    <title> Catalogue | Curltoon</title>
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
                            Home / Catalogue / Intellectual Property
                        </div>
                        
                        <h4> Intellectual Property </h4>
                        <div className="ipCardContainer d-flex">


                        <div className="row gx-3">

                        {intellectialProperties.length> 0 && intellectialProperties.map((ip,index)=> 
                        <Link href="/entrepreneur/catalogue/detail">
                            <a className="col-md-4">
                                <IPcard key={index} title={ip.title} description={ip.description} image={ip.image}/>
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


const intellectialProperties = [
    {"title":"Intellectual property 1", "description": "Ip1 description", "image":"/ipImg1.jpg"},
    {"title":"Intellectual property 2", "description": "Ip2 some description text", "image":"/ipImg2.jpg"},
    {"title":"Intellectual property 3", "description": "Ip3 some description text here", "image":"/ipImg3.jpg"},
    {"title":"Intellectual property 4", "description": "Ip4 some description text here", "image":"/ipImg4.jpg"},
    {"title":"Intellectual property 5", "description": "Ip5 some description text here", "image":"/ipImg5.jpg"}
]

