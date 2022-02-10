import SideBar from '../../../components/Sidebar';
import Card from 'react-bootstrap/Card';
import { useForm } from "react-hook-form";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import link from 'next/link';
import Head from "next/head";
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Create() {


    const router = useRouter();
    const {pipeline} = router.query;


    const [result, setResult] = useState("");

    const linkContainer = useRef(null);
    const [ips,setIps] = useState([]);
    const [ipsLoaded,setIpsLoaded] = useState(false);

    async function fetchIps () {
        const res = await fetch("/api/entrepreneur/lab/", {
              credentials: 'include',
              method: 'GET', 
              headers: {
                  'Content-Type': 'application/json',
              }
          });
        const data = await res.json();
        if (!data.errors)
        {
            setIps(data);
            setIpsLoaded(true);
        }
    }

    useEffect(()=> {
        if (!ipsLoaded){
            fetchIps();
        }
    },[ipsLoaded])


    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        data.inspirationLinks = inspirationLinks;
        data.pipeline = pipeline;

        // console.log(data);

        setResult(JSON.stringify(data));
        console.log(data);

        // console.log(result);

        axios.post('/api/entrepreneur/project', data)
            .then(response =>
                //  this.setState({ articleId: response.data.id })
               { console.log(response);
               }
                );
    }

    const [inspirationLinks,setInspirationLinks] = useState([""]);

    // const [linkCount,setLinkCount] = useState(1);

    const handleInpirationLinkRemoval = i =>{
        
        let linkHolder =[...inspirationLinks];
        linkHolder.splice(i, 1);
        setInspirationLinks(linkHolder);
    }

    const handleLinkAdd = () => {
        let linkHolder =[...inspirationLinks];
        linkHolder.push("");
        setInspirationLinks(linkHolder);
    }

    const handleLinkChange = (e,i) => {
        let linkHolder =[...inspirationLinks];
        linkHolder[i] = e.target.value;
        setInspirationLinks(linkHolder);

    }

    return (
            <>
            <Head>
                    <title> Studio - Create Project | Curltoon </title>
                    <meta name="description" content="Curltoon" />
                    <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="row bg-contentbgColor">
                <div className="sideBarContainer p-0">
                     <SideBar />
                </div>
                <div className="contentContainer p-0">
                  



                    <div className="ipBodyContainer p-3">

                        <div className="breadcrumbContainer text-muted">
                          Home / Studio / Project / Create
                        </div>

                        <h3>  Create New Project </h3>
        
                        <div className="ipCardContainer row">

                            <div className="col-md-8 ipCreateFormContainer">

                                <form onSubmit={handleSubmit(onSubmit)}>    
                                    <Card className="mb-2 createCard">
                                        <Card.Body>
                                            <h5> Project Details </h5>
                                            <div>
                                                <div className="mb-3">
                                                    <label htmlFor="intellectualProperty" className="form-label text-muted">Title</label>
                                                    <select {...register("intellectualProperty")} className="form-control">
                                                                            <option value="">Project Title</option>
                                                                            {ips.map((g,gindex)=> 
                                                                            <option key={gindex} value={g._id}>{g.title}</option>
                                                                            )}
                                                    </select>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="description" className="form-label text-muted">Brief Description</label>
                                                    <textarea {...register("description", {})} className="form-control" id="description" />
                                                </div>

                                                <div className="row">

                                                        <div className="col-md-4">
                                                          <div className="mb-3">
                                                          <label htmlFor="genre" className="form-label text-muted">Genre</label>
                                                          <select {...register("genre")} id="genre" className="form-control">
                                                                        <option value="">Genre</option>
                                                                        {genreOptions.map((g,gindex)=> 
                                                                        <option key={gindex} value={g.value}>{g.label}</option>
                                                                        )}
                                                            </select>
                                                          </div>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <label htmlFor="style" className="form-label text-muted">Style</label>
                                                            <select {...register("style")} className="form-control">
                                                                            <option value="">Style</option>
                                                                            {stylesOptions.map((g,gindex)=> 
                                                                            <option key={gindex} value={g.value}>{g.label}</option>
                                                                            )}
                                                            </select>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <label htmlFor="relatedIp" className="form-label text-muted">Related IP</label>
                                                            <input {...register("relatedIp")} className="form-control"></input>

                                                            {/* <select {...register("ageGroup")} className="form-control">
                                                                            <option value="">Age Group</option>
                                                                            {ageGroupOptions.map((g,gindex)=> 
                                                                            <option key={gindex} value={g.value}>{g.label}</option>
                                                                            )}
                                                            </select> */}
                                                        </div>


                                                </div>


                                            </div>
                                        </Card.Body>
                                    </Card>

                                    <Card className="mb-4 createCard">
                                        <Card.Body 
                                        >
                                            <h5> Inspiration Links </h5>

                                         
                                            {(inspirationLinks.map((link,index)=>
                                                        <div className="row" key={index}>
                                                        <input type="text"
                                                        value={link}
                                                        onChange={(e)=>handleLinkChange(e,index)}
                                                          className="form-control w-100 me-2 mb-2" placeholder="Add Inspiration links" />
                                                        {/* <Button variant="danger" 
                                                        onClick={()=>handleInpirationLinkRemoval(index)}
                                                        style={{width:'10%'}}
                                                        > 
                                                        <i className="bi bi-trash"></i> 
                                                        </Button> */}
                                                    </div>
                                            ))}

                                            <Button variant="outline" 
                                            onClick={(e)=>handleLinkAdd(e)}> Add </Button>


                                        </Card.Body>
                                    </Card>

                                    <Card className="createCard mb-2">
                                        <Card.Body>
                                        <h5> Materials </h5>
                                        </Card.Body>
                                    </Card>

                                    <Button type="submit"> Create Project </Button>
                                </form>

                            </div>


                            <div className="col-md-4">
                                    <Card>
                                        <Card.Img variant="top" src='/ipImg5.jpg' className="ipCardImg"/>
                                        <Card.Body>
                                        <Card.Title>How to create Project?</Card.Title>
                                        <Card.Text>
                                           Instructions for Project creation
                                        </Card.Text>
                                        </Card.Body>
                                    </Card>
                                    {/* <Card>
                                        <Card.Body>
                                            {JSON.stringify(result)}
                                        </Card.Body>
                                    </Card> */}
                            </div>
                            
                        </div>
                    
                    </div>

                </div>
            </div>
            </>
    )
}


const genreOptions = [
    {label:"Action", value:"Action"},
    {label:"Fantasy", value:"Fantasy"},
    {label:"Adventure", value:"Adventure"},
    {label:"Comedy", value:"Comedy"},
    {label:"Thriller", value:"Thriller"},
    {label:"Horror", value:"Horror"},
    {label:"Drama", value:"Drama"},
    {label:"Sport", value:"Sport"},
    {label:"Science Fiction", value:"SciFi"},
    {label:"Romance", value:"Romance"},
    {label:"Education", value:"Education"},
]

const stylesOptions = [
    {label:"Classic",value:"Classic"},
    {label:"Modern",value:"Modern"},
    {label:"Realistic",value:"Realistic"},
    {label:"Anime",value:"Anime"},
    {label:"Chibi",value:"Chibi"},
    {label:"Minimalist",value:"Minimalist"},
    {label:"Unique Art Style",value:"Unique"}
]

const ageGroupOptions = [
    {label:"Everyone",value:"0"},
    {label:"Pre- School",value:"3-5"},
    {label:"Tweens",value:"8-12"},
    {label:"Teens",value:"12-17"},
    {label:"Mature",value:"17+"}
]




const ipOptions = [
    {label:"2d pilot short",value:"ip1"},
    {label:"3d level based game",value:"ip2"},
    {label:"3d episode",value:"ip3"}
]