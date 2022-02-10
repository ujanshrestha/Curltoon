import Head from "next/head";
import AdminSidebar from './AdminSidebar';

export default function AdminHomePage(){
    return (
        <div>
          <Head>
            <title>Curltoon</title>
            <meta name="description" content="Curltoon" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
    
            <div className="row bg-contentbgColor">
                    <div className="p-0 sideBarContainer">
                     <AdminSidebar />
                    </div>
                    <div className="p-0 contentContainer">
                            Curltoon Admin 
                    </div>
            </div>
    
     
        </div>);
    }

