import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Card from 'react-bootstrap/Card';
import LandingCard from "../components/LandingCard";
import IPCreateLandingCard from "../components/IPCreateLandingCard";
import Router from "next/router";
import EntrepreneurHomePage from "../components/EntrepreneurHomePage";
import AdminHomePage from "../components/Admin/AdminHomePage";
import Loader from "../components/Loader";
import FreelancerHomePage from "../components/Freelancer/FreelancerHomePage";

export default function Home() {
  const { user,userFetched } = useContext(UserContext);
  
  
  // const allowAccess = useAuthCheck(user,userFetched,"sdsd");
  
  useEffect(() => {
  
    //appUser.role check for entrepreneur and freelancer users send to not allowed page
    if (userFetched && !user)
    {
       Router.push('/login');
    }
  
  },[userFetched,user])


  if (user){
    return(
      <>
      {(user.role=="entrepreneur") && <EntrepreneurHomePage />}
      {(user.role=="admin") && <AdminHomePage />}
      {(user.role=="freelancer") && <FreelancerHomePage />}
      </>)
    }
    else {
      return (
        <Loader />
      )
      ;
    }
}


