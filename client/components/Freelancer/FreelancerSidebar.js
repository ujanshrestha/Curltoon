import Link from "next/link";
import { useRouter } from 'next/router'

import React, { useContext, useEffect, useState } from "react";

import  Button  from "react-bootstrap/Button";
import  Collapse  from "react-bootstrap/Collapse";
import { UserContext } from "../../context/UserContext";


export default function FreelancerSidebar(){

    const router = useRouter();
    const { user,setUser } = useContext(UserContext);


    const [openProfile, setOpenProfile] = useState((router.pathname=='/freelancer/profile/personal-details' || router.pathname=='/freelancer/profile' )? true:false);


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
                  onClick={() => setOpenProfile(!openProfile)}
                  aria-controls="example-collapse-text"
                  aria-expanded={openProfile}
                  role="button"

              >
                  {/* <img className="me-2" src="/desktop_mac_24px.png"/ > */}
                Profile
              </a>

            
            <Collapse in={openProfile}>
              <ul className="sidebarChildItems">
                <li className="list-unstyled"
                  style={{color:(router.pathname=='/freelancer/profile/personal-details')?'#0a58ca':''}}
                >
                  <Link href="/freelancer/profile/personal-details" className="text-decoration-none" 
                > Personal Details </Link>
                </li>
                <li className="list-unstyled"
                  style={{color:(router.pathname=='/freelancer/profile/change-password')?'#0a58ca':''}}
                  >
                  <Link href="/freelancer/profile/change-password" className="text-decoration-none">Change Password</Link>
                </li> 
                <li className="list-unstyled"
                  style={{color:(router.pathname=='/freelancer/profile/freelancer-details')?'#0a58ca':''}}
                  >
                  <Link href="/freelancer/profile/freelancer-details" className="text-decoration-none">Freelancer Details</Link>
                </li>
              </ul>
            </Collapse>
            </li>

  

          </ul>

          <ul className="list-unstyled" style={{marginTop:'350px'}}>
           
          <li>

           
            {user && !user.image && <img className="rounded-circle fw-300 me-2" style={{height:'50px',width:'50px'}} src="/defaultprofilepic.png" /> }
            {user && user.image && <img className="rounded-circle fw-300 me-2" style={{height:'50px',width:'50px'}} src={"/uploads/freelancer/"+user.image} /> }
           
            {user && user.name}

          </li>

          <li>
             <div role="button" onClick={handleLogout}> Logout </div>
          </li>

         

         

        
           
          </ul>
        </nav>
      );
    };
  