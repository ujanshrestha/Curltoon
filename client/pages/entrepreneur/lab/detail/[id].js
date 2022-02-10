import React, { useState } from 'react'
import SideBar from '../../../../components/Sidebar';

import IPFreelancersCard from '../../../../components/IPFreelancersCard';
import Head from "next/head";
import { useRouter } from 'next/router';

export default function IpDetail() {
  
    const router = useRouter()
    const { id } = router.query

    return (
            <>
                <Head>
                    <title> Lab - IP Details | Curltoon</title>
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

                        <div className="ipStagingContainer bg-primary bg-gradient rounded d-flex align-items-center justify-content-between">
                            {stageBannerValues.map((stageBannerValue,stageBannerIndex)=><div
                            className="p-3 border-end"
                            key={stageBannerIndex}
                            >
                                {stageBannerValue.value}
                                <span className="d-block fw-100 opacity-75">  {stageBannerValue.label} </span>


                                </div>)}
                        </div>

                           
                            <div className="serviceCardsContainer d-flex mt-2 w-100"
                            >
                            
                                    {serviceTypeValues.length>0 && serviceTypeValues.map((serviceTypeVal,serviceTypeInd)=>
                                    <IPFreelancersCard
                                    key={serviceTypeInd}  image={serviceTypeVal.image} title={serviceTypeVal.title} value={serviceTypeVal.value} />
                                    )}


                            </div>
                  
                    
                    
                    </div>

                </div>
            </div>

     
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
    {"title": "Script Writer", "value": "scriptwriter",'image':"/ipImg1.jpg"},
    {"title": "Character Design", "value": "characterdesign","image":"/ipImg4.jpg"},
    {"title": "World Design", "value": "worlddesign","image":"/ipImg2.jpg"},
    {"title": "Brand Design", "value": "branddesign","image":"/ipImg3.jpg"},
    {"title": "Song Writer", "value": "songwriter","image":"/ipImg7.jpg"}
]


