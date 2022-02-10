import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Router from "next/router";


export default function useAccessCheck(requiredRole) {
  const [allowAccess, setAllowAccess] = useState(null);
  const { user,userFetched } = useContext(UserContext);

  useEffect(() => {
    if (userFetched && user){
        if (user.role==requiredRole){
          setAllowAccess(true);
        }
        else {
          setAllowAccess(false);
        }
    }

    if (userFetched && !user)
    {
       Router.push('/login');
    }

    // return () => {
    // };
  },[user,userFetched]);

  return allowAccess;
}