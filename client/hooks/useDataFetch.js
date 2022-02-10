import { useState, useEffect } from 'react';

export default function useDataFetch(url) {
    
    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loaded,setLoaded] = useState(false)

    async function fetchData () {
        const res = await fetch(url, {
              credentials: 'include',
              method: 'GET', 
              headers: {
                  'Content-Type': 'application/json',
              }
          });
    
        if (res.status==200){
            const data = await res.json();
            if (!data.errors)
            {
                setData(data);
                setLoaded(true);
            }
            else {
                setError(data.error);
            }
            
        }
    }
    
    useEffect(()=> {
        if (!loaded){
            fetchData();
        }
    },[loaded])

    return {data,error,loaded,setLoaded};
}