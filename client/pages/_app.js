import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import { UserContext } from '../context/UserContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


function MyApp({ Component, pageProps }) {

  const history = useRouter();

  const [user, setUser] = useState(null);
  const [userFetched, setUserFetched] = useState(false);
  
  async function fetchUser () {
    const res = await fetch("/api/auth", {
          credentials: 'include',
          method: 'GET', 
          headers: {
              'Content-Type': 'application/json',
          }
      });

    if (res.status==200){
      const data = await res.json();
      if (!data.errors) setUser(data);
    }

    setUserFetched(true);

 
  }



  useEffect(() => {
      if (!userFetched) {
        fetchUser();
      }
  },[userFetched])

  return (
  <UserContext.Provider value={{user,setUser,userFetched,setUserFetched}}>
    <Component {...pageProps} />
  </UserContext.Provider>);
}

export default MyApp
