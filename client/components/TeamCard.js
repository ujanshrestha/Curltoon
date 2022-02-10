import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { scriptWriters,characterDesigners, worldDesigners, brandDesigners, songWriters,locationdesign,storyboard ,animatics } from './FreelancersData';

import Modal from 'react-bootstrap/Modal';
import SingleFreelancerCard from './SingleFreelancerCard';

export default function TeamCard(props) {
    
    let freelancersArr = [];
    if (props.value == "scriptwriter")
    {
        freelancersArr = scriptWriters;
    }

    else if (props.value == "characterdesign")
    {
        freelancersArr = characterDesigners;
    }

    else if (props.value == "worlddesign")
    {
        freelancersArr = worldDesigners;
    }

    else if (props.value == "branddesign")
    {
        freelancersArr = brandDesigners;
    }

    else if (props.value == "songwriter")
    {
        freelancersArr = songWriters;
    }

    else if (props.value=="locationdesign")
    {
        freelancersArr = locationdesign;
    }

    else if (props.value=="storyboard")
    {
        freelancersArr = storyboard;
    }

    else if (props.value=="animatics")
    {
        freelancersArr = animatics;
    }

    const [infoModalShow, setInfoModalShow] = useState(false);

    const handleInfoModalClose = () => setInfoModalShow(false);
    const handleInfoModalShow = () =>  setInfoModalShow(true);



    return (<>
    <div className="innerServiceCard col-md-4 me-3">
        <Card>
            <Card.Title> 
                <span
                onClick={handleInfoModalShow}
                  role="button">
                    {props.title}
                     </span>
            </Card.Title>
            <Card.Img 
                variant="top" src={props.image} 
                className="ipCardImg"
            />
            <Card.Body>
    
            {freelancersArr.length>0  && freelancersArr.map((freelancer,index)=>
            <SingleFreelancerCard key={index} freelancer={freelancer} title={props.title} />
            )}
            <Button variant="outline-secondary" className="w-100">Add New Member</Button>
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
    )
}
