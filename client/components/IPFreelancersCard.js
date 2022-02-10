import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


import Modal from 'react-bootstrap/Modal';
import SingleFreelancerCard from './SingleFreelancerCard';
import { scriptWriters } from './FreelancersData';
import axios from 'axios';

export default function IPFreelancersCard(props) {

    const [freelancersArr,setFreelancersArr] = useState([]);
        // (props.team.serviceType.title=="Screen Writer")? scriptWriters: []);
    const [freelancersLoaded,setFreelancersLoaded] = useState(false);
    const [draggedEle,setDraggedEle] = useState(null);
    const [draggedOnEle,setDraggedOnEle] = useState(null);
    
    const [infoModalShow, setInfoModalShow] = useState(false);

    const handleInfoModalClose = () => setInfoModalShow(false);
    const handleInfoModalShow = () =>  setInfoModalShow(true);

    const onDragStart = (i) => {
        setDraggedEle(i);
        console.log("drag start");
    }

    const onDragOver = (i) => {
        if (i!=null){
            console.log(i);
            setDraggedOnEle(i);
        }
    }


    async function fetchData () {
        const res = await fetch('/api/entrepreneur/lab/team-details/'+props.team._id, {
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
                // setData(data);
                // setLoaded(true);
                if (data.freelancers.length>0){
                    console.log("freelacners here",data.freelancers);
                    setFreelancersArr(data.freelancers);
                    // console.log(props.team.serviceType.title);
                    // console.log(data);
                }
             
                setFreelancersLoaded(true);

            }
            else {
                console.log("error",data.error);
            }
            
        }
    }
    

    let tempFreelancersArr = [...freelancersArr];
 

    const onDragEnd = (evt,row) => {
        // setFreelancersArr([]);
        //set null
        tempFreelancersArr[draggedOnEle] = freelancersArr[draggedEle];
        tempFreelancersArr[draggedEle] = freelancersArr[draggedOnEle];
        console.log("order");
        let freelancersPostArr = [];
        for (let i=0;i<tempFreelancersArr.length;i++){
            // console.log(tempFreelancersArr[i]);
            freelancersPostArr.push({"name":tempFreelancersArr[i].name,"freelancer":tempFreelancersArr[i].freelancer._id,"rate":tempFreelancersArr[i].rate})
        }
        console.log(freelancersPostArr);

        axios.post('/api/entrepreneur/lab/team',{teamId:props.team._id,freelancers:freelancersPostArr})
        .then(response =>
           { 
            if (response.status==200){
                setFreelancersLoaded(false);
            }
           }
        );

        
    }

    useEffect(()=>{
        if (!freelancersLoaded){
            fetchData();
        }
    },[freelancersLoaded])


    if (!freelancersLoaded){
        return(<>
            Loading
        </>)
    }

    else {
    return (<>
    <div className="innerServiceCard col-md-4 me-3">
        {props.team._id}
        <Card>
            <Card.Title> 
                <span
                onClick={handleInfoModalShow}
                  role="button">
                    {props.team.serviceType.title}
                     </span>
            </Card.Title>
            <Card.Img 
                variant="top" src={props.team.image} 
                className="ipCardImg"
            />
            <Card.Body>
    
            {freelancersArr.length>0  && freelancersArr.map((freelancer,index)=>
             <div
                draggable
                onDragStart={(evt)=>onDragStart(index)}
                onDragOver={(evt)=>onDragOver(index)}
                onDragEnd={(evt)=>onDragEnd(evt,freelancer)}
            // key={e._id}
                key={index}
             >
             <SingleFreelancerCard
             freelancer={freelancer} title={props.title} key={index} />
             </div>
            )}
            <Button variant="outline-secondary" className="w-100">Add New Freelancer</Button>
            </Card.Body>
        </Card>
    </div>

    {/* info modal          */}
        <Modal show={infoModalShow} onHide={handleInfoModalClose}>
            <Modal.Header closeButton style={{border:'none'}}>
            <Modal.Title >
            {props.title}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                    <img src={props.image} className="w-100 mb-2"></img>

                    <div>
                        <div className="mb-2">
                            <h6>Pre-requisities</h6>
                            <p>
                                lorem ipsum
                            </p>
                        </div>

                        <div className="mb-2">
                            <h6>Outcome</h6>
                            <p>
                                lorem ipsum
                            </p>
                        </div>

                        <div className="mb-2">
                            <h6>Format</h6>
                            <p>
                                lorem ipsum
                            </p>
                        </div>

                        <div className="mb-2">
                            <h6>Software</h6>
                            <p>
                                lorem ipsum
                            </p>
                        </div>


                    </div>

            </Modal.Body>
        
        </Modal>
    {/* info modal */}

    {/* summary modal */}


    {/* summary modal */}
    </>
    )}
}
