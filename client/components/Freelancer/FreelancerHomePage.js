import FreelancerSidebar from "./FreelancerSidebar";
import Head from "next/head";
export default function FreelancerHomePage(){
    return(<>
        <div>
          <Head>
            <title>Curltoon</title>
            <meta name="description" content="Curltoon" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
    
            <div className="row bg-contentbgColor">
                    <div className="p-0 sideBarContainer">
                     <FreelancerSidebar />
                    </div>
                    <div className="p-0 contentContainer">
                            Freelancer 
                    </div>
            </div>
    
     
        </div>)
    </>);
}