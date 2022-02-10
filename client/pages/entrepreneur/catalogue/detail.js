import React, { useState } from 'react'
import IPcard from '../../../components/IPcard';
import SideBar from '../../../components/Sidebar';

import Link from 'next/link';
import IPFreelancersCard from '../../../components/IPFreelancersCard';
import Head from "next/head";
import { useRouter } from 'next/router';
import EntrepreneurSettingSidebar from '../../../components/EntrepreneurSettingSidebar';
import Card from 'react-bootstrap/Card';
import { useForm } from "react-hook-form";

export default function Detail() {
    

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
                        
                        <h4> Intellectual Property Details </h4>

                        <p className="text-muted">
                            Lorem ipsum dolor sit amet, qui solum qualisque eu, debet dolor in eum. Vel legere quidam iisque id, causae scripta eruditi an vix. Id cum fabellas persequeris consequuntur. Nostrum blandit in has, nusquam epicuri in eam, quidam equidem mentitum ad vix. Te porro malorum omittam his, eam ne amet vocent salutatus, vis salutandi efficiendi delicatissimi te.
                        </p>

                        <div>
                            Pipeline:
                            <div className="d-flex">
                                {pipelineFolders.map((folder,index)=>
                                <button key={index} className="btn btn-light me-2">
                                 <img src="/folder_24px.png" />  {folder}
                                </button>
                                )}
                            </div>
                        </div>
                                      
                        
                    </div>

                </div>
              
            </div>

     
            </>
    )
}

const pipelineFolders=[
    "Script Writer", "Character Design", "World Design", "Brand Design"
]
