import Link from "next/link";
import { useRouter } from 'next/router'

import React, { useContext, useEffect, useState } from "react";

import  Button  from "react-bootstrap/Button";
import  Collapse  from "react-bootstrap/Collapse";
import { UserContext } from "../context/UserContext";


export default function SideBar(){

    const router = useRouter();
    const { user,setUser } = useContext(UserContext);


    const [openLab, setOpenLab] = useState((router.pathname=='/entrepreneur/lab/list' || router.pathname == '/entrepreneur/lab/create' || router.pathname == '/entrepreneur/lab/servicecard')? true:false);

    const [openStudio, setOpenStudio] = useState((router.pathname=='/studio/create' || router.pathname == '/studio/projects' || router.pathname == '/studio/projectcard' || router.pathname == '/studio/pipelines')? true:false);

    async function handleLogout () {
      const res = await fetch("/api/auth/logout", {
            credentials: 'include',
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            }
        });
      if (res.status==200) setUser(null);
      }

    // },[])

      return (<nav id="sidebar" className="sidebar bg-white">
          <div className="sidebar-header">
            <h3><Link href="/"> CURLTOON </Link> </h3>
          </div>


          <ul className="list-unstyled components m-0 p-0">
          
            <li className="mb-2">
            
              <a
                  onClick={() => setOpenLab(!openLab)}
                  aria-controls="example-collapse-text"
                  aria-expanded={openLab}
                  role="button"

              >
                  <img className="me-2" src="/desktop_mac_24px.png"/ >
                Lab
              </a>

            
            <Collapse in={openLab}>
              <ul className="sidebarChildItems">
                <li className="list-unstyled"
                  style={{color:(router.pathname=='/entrepreneur/lab/create')?'#0a58ca':''}}
                >
                  <Link href="/entrepreneur/lab/create" className="text-decoration-none" 
                > Create New IP </Link>
                </li>
                <li className="list-unstyled"
                  style={{color:(router.pathname=='/entrepreneur/lab/list')?'#0a58ca':''}}
                  >
                  <Link href="/entrepreneur/lab/list" className="text-decoration-none">Intellectual Property</Link>
                </li>
              </ul>
            </Collapse>
            </li>

          <li>
            
            <a
                onClick={() => setOpenStudio(!openStudio)}
                aria-controls="example-collapse-text"
                aria-expanded={openStudio}
                role="button"

            >
                <img className="me-2" src="/studioSidebar.png" />
              Studio
            </a>

          
          <Collapse in={openStudio}>
            <ul className="sidebarChildItems">
              <li className="list-unstyled"
                style={{color:(router.pathname=='/entrepreneur/studio/pipelines')?'#0a58ca':''}}
              >
                <Link href="/entrepreneur/studio/pipelines" className="text-decoration-none" 
              > Create New Project </Link>
              </li>
              <li className="list-unstyled"
                style={{color:(router.pathname=='/entrepreneur/studio/projects')?'#0a58ca':''}}
                >
                <Link href="/entrepreneur/studio/projects" className="text-decoration-none"> Projects </Link>
              </li>
            </ul>
          </Collapse>
          </li>


          </ul>

          <ul className="list-unstyled" style={{marginTop:'350px'}}>
            <li>

             {user && user.image && <img className="rounded-circle fw-300 me-2" style={{height:'50px',width:'50px'}} src={"/uploads/freelancer/"+user.image} /> }

             {user && !user.image && <img className="rounded-circle fw-300 me-2" style={{height:'50px',width:'50px'}}src="/defaultprofilepic.png" /> }

             {user && user.name}

            </li>
            <li>
             <Link href="/entrepreneur/catalogue" className="text-decoration-none">
                <div role="button"> <img className="me-2" src="/folder_24px.png"/ >
                Catalogue
                </div>
              </Link>
            </li>

            <li>
             <Link href="/entrepreneur/team" className="text-decoration-none">
                <div role="button"> <img className="me-2" src="/group_24px.png"/ >
                Team
                </div>
              </Link>
            </li>

            <li>
             <Link href={"/entrepreneur/settings/user-profile"} className="text-decoration-none" passHref>
             <div role="button"> <img className="me-2" src="/settings_24px.png"/ >
               Settings
              </div>
            </Link>
            </li>

            <li>
             <div role="button" onClick={handleLogout}> Logout </div>
            </li>

         

         

        
           
          </ul>
        </nav>
      );
    };
  