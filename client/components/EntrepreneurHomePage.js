import Card from 'react-bootstrap/Card';
import Head from "next/head";
import SideBar from "../components/Sidebar";

import LandingCard from "../components/LandingCard";
import IPCreateLandingCard from "../components/IPCreateLandingCard";

export default function EntrepreneurHomePage(){
    return (
        <div>
          <Head>
            <title>Curltoon</title>
            <meta name="description" content="Curltoon" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          {/* <section>
          {appUser ? <div> Logged in user is {appUser.name} </div> : "No logged in user"}
          </section> */}
    
    
            <div className="row bg-contentbgColor">
                    <div className="p-0 sideBarContainer">
                     <SideBar />
                    </div>
                    <div className="p-0 contentContainer">
               
                        <div className="landingCoverImage text-center">
                              <h2 
                              className="pt-3"
                              >
                                Main Page space
                              </h2>
                        </div>  
    
                        <div className="landingContent m-5">
    
                          {landingCards.map((card,i)=>
                            <LandingCard card={card} />
                          )}
    
                          <hr/>
    
                          <LandingCard card={trainingMaterialCard} />
    
    
    
    
                        </div>
                    </div>
                </div>
    
     
        </div>);
    }

const landingCards = [
    {"title": "Create an IP", "image":"/createIpIcon.png", "rightText": "4 steps left | About 8 Minutes","rfc":<IPCreateLandingCard />},
    {"title": "Package the product", "image":"/packaging.png", "rightText": "3 steps left | About 5 Minutes"},
    {"title": "Sell the product", "image":"/sellProduct.png", "rightText": "4 steps left | About 6 Minutes"},
    {"title": "Set up your site", "image":"/setUpSite.png", "rightText": "4 steps left | About 6 Minutes"}
  ]
  
  const trainingMaterialCard = {
    "title": "Training Material card","rfc":<>
      <h6> Pick a Blue print and title</h6>
      <div>
      <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis eu volutpat odio facilisis mauris sit amet. Est pellentesque elit ullamcorper dign
      </p>
       <img src="/ipImg6.jpg" height="160px"/>
      </div>
    </>
  }