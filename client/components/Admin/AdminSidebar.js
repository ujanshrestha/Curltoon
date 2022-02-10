import Link from "next/link";
import { useRouter } from 'next/router'

import React, { useContext, useEffect, useState } from "react";

import  Button  from "react-bootstrap/Button";
import  Collapse  from "react-bootstrap/Collapse";
import { UserContext } from "../../context/UserContext";


export default function AdminSidebar(){

    const router = useRouter();
    const { user,setUser } = useContext(UserContext);

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
          
          
              <ul className="sidebarChildItems">
                <li className="list-unstyled mb-3"
                  style={{color:(router.pathname=='/admin/entrepreneur')?'#0a58ca':''}}
                >
                  <Link href="/admin/entrepreneur" className="text-decoration-none" 
                > Entrepreneurs </Link>
                </li>
                <li className="list-unstyled"
                  style={{color:(router.pathname=='/admin/ip-pipelines')?'#0a58ca':''}}
                  >
                  <Link href="/admin/ip-pipelines" className="text-decoration-none">
                        IP Pipelines
                  </Link>
                </li>
                <li className="list-unstyled mb-3"
                  style={{color:(router.pathname=='/admin/project-pipelines')?'#0a58ca':''}}
                  >
                  <Link href="/admin/project-pipelines" className="text-decoration-none">
                        Project Pipelines
                  </Link>
                </li>

                <li className="list-unstyled"
                  style={{color:(router.pathname=='/admin/genre')?'#0a58ca':''}}
                  >
                  <Link href="/admin/genre" className="text-decoration-none">
                        Genres
                  </Link>
                </li>

                <li className="list-unstyled"
                  style={{color:(router.pathname=='/admin/art-style')?'#0a58ca':''}}
                  >
                  <Link href="/admin/art-style" className="text-decoration-none">
                        Art Styles
                  </Link>
                </li>

                <li className="list-unstyled"
                  style={{color:(router.pathname=='/admin/age-group')?'#0a58ca':''}}
                  >
                  <Link href="/admin/age-group" className="text-decoration-none">
                        Age Groups
                  </Link>
                </li>
              </ul>

          </ul>

          <ul className="list-unstyled" style={{marginTop:'350px'}}>
            <li>

             {user && !user.image && <img className="rounded-circle fw-300 me-2" style={{height:'50px',width:'50px'}}src="/defaultprofilepic.png" /> }
             {user && user.name}

            </li>
         

            <li>
             <div role="button" onClick={handleLogout}> Logout </div>
            </li>

          </ul>
        </nav>
      );
    };
  