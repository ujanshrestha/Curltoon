import Head from "next/head";
import IPcard from "../../../components/IPcard";
import SideBar from "../../../components/Sidebar";

import Link from "next/link";
import PipelineCard from "../../../components/PipelineCard";
import { useEffect, useState } from "react";

export default function Pipelines() {

  const [pipelines,setPipelines] = useState([]);
  const [pipelinesLoaded,setPipelinesLoaded] = useState(false);



  async function fetchPipelines () {
      const res = await fetch("/api/entrepreneur/project/pipelines-types/list", {
            credentials: 'include',
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            }
        });
      const data = await res.json();
      if (!data.errors)
      {
        setPipelines(data);
        setPipelinesLoaded(true);
      }
  }

  useEffect(()=> {
      if (!pipelinesLoaded){
        fetchPipelines();
      }
  },[pipelinesLoaded])
  


  return (
    <>
      <Head>
        <title> Studio - Pipelines | Curltoon </title>
        <meta name='description' content='Curltoon' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='row bg-contentbgColor'>
        <div className='sideBarContainer p-0'>
          <SideBar />
        </div>
        <div className='contentContainer p-0'>
          <div className='searchContainer'>
            <div className='my-2'>
              <img src='/ipListSearchIcon.png' />
              <input type='text' />
            </div>
          </div>

          <div className='ipBodyContainer p-3'>
            <div className='breadcrumbContainer text-muted'>
              Home / Studio / Pipelines
            </div>

            <h3> Pipelines </h3>

            <div className='ipCardContainer d-flex'>
              <div className='row gx-3'>

                {pipelinesLoaded && pipelines.length > 0 &&
                  pipelines.map((pipeline, index) => (
                    <div className='col-md-4'>
                      <PipelineCard
                        key={index}
                        id={pipeline._id}
                        title={pipeline.name}
                        description={pipeline.name}
                        image=""
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

