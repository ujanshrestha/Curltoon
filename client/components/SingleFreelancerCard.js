import { useContext, useEffect, useState } from "react";

import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from "../context/UserContext";

export default function SingleFreelancerCard(props){

    const { user } = useContext(UserContext);

    //need freelancer and freelancer messages data here


    const freelancer = props.freelancer;
    const [descModalShow, setDescModalShow] = useState(false);

    const [comment,setComment] = useState("");
  
    const [messages,setMessages] = useState([]);
    const [messagesLoaded,setMessagesLoaded] = useState(false);

    
    const handleDescModalClose = () => setDescModalShow(false);
    const handleDescModalShow = () =>  setDescModalShow(true);
    const updateComment = (e) => {
        let newComment = {comment,user};
        let tempComments = [...messages];
        tempComments.push(newComment);
        setMessages(tempComments);
        setComment("");
    }

    useEffect(()=> {
        if (!messagesLoaded){
            setMessagesLoaded(true);
        }
    },[messagesLoaded])

    return (<>
            <Card className="mb-2">
                    <Card.Body
                        onClick={handleDescModalShow}
                        role="button"
                    >
                          {freelancer.freelancer && !freelancer.freelancer.image && <img className="rounded-circle fw-300 me-2" style={{height:'50px',width:'50px'}} src="/defaultprofilepic.png" /> }
                          {freelancer.freelancer && freelancer.freelancer.image && <img className="rounded-circle fw-300 me-2" style={{height:'50px',width:'50px'}} src={"/uploads/freelancer/"+freelancer.freelancer.image} /> }
                        {/* <img src={freelancer.image} className="rounded-circle fw-300" style={{height:'50px',width:'50px'}}/>  */}
                        {freelancer.name} 
                    </Card.Body>
            </Card>

            <Modal show={descModalShow} onHide={handleDescModalClose}>
                <Modal.Header closeButton
                //  style={{border:'none'}}
                 >
                <Modal.Title className="row">
                        <div>
                          {freelancer.freelancer && !freelancer.freelancer.image && <img className="rounded-circle fw-300 me-2" style={{height:'50px',width:'50px'}} src="/defaultprofilepic.png" /> }
                          {freelancer.freelancer && freelancer.freelancer.image && <img className="rounded-circle fw-300 me-2" style={{height:'50px',width:'50px'}} src={"/uploads/freelancer/"+freelancer.freelancer.image} /> }
                        </div>
                        <div> {props.freelancer.name} </div>
                        <div> {props.title} </div>


                        <div className="row text-muted serviceModalSubHeaders"> 
                            <div className="col-md-4">
                                9 sep 2021
                            </div>
                            <div className="col-md-4">
                                  $  400 min
                            </div>
                            <div className="col-md-4">
                                  $ 1000 max
                            </div>
                        </div>
                    
                
                </Modal.Title>

     

                </Modal.Header>
                <Modal.Body className="serviceModalBody">

                        <div className="row">
                            
                            <div className="col-md-9">

                                <div className="descriptionContainer">
                                    <h6>Description</h6>

                                    <p className="text-muted"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis eu volutpat odio facilisis mauris sit amet. Est pellentesque elit ullamcorper dignissim cras. Netus et malesuada fames ac turpis egestas sed. Tempor commodo ullamcorper a lacus vestibulum sed. Posuere morbi leo urna molestie at elementum eu facilisis sed. Vitae sapien pellentesque habitant morbi tristique. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Eros donec ac odio tempor. Nec dui nunc mattis enim ut
                                    </p>
                                </div>

                                <div className="activityContainer">
                                    <h6>
                                        Activity
                                        <div className="commentsContainer row mb-2">
                                                {messages.length>0 && messages.map((m,i)=><>
                                                    <div className="col-md-2 mb-2">
                                                      {m.user && m.user.image && <img className="rounded-circle fw-300 me-2" style={{height:'50px',width:'50px'}} src={"/uploads/freelancer/"+m.user.image} /> }
                                                      {m.user && !m.user.image && <img className="rounded-circle fw-300 me-2" style={{height:'50px',width:'50px'}}src="/defaultprofilepic.png" /> }
                                                    </div>
                                                    <div className="col-md-10">
                                                        {m.comment}
                                                    </div>
                                                </>)}
                                        </div>
                                        <div className="activityPostContainer row">
                                            <div className="col-md-2">
                                             {user && user.image && <img className="rounded-circle fw-300 me-2" style={{height:'50px',width:'50px'}} src={"/uploads/freelancer/"+user.image} /> }
                                             {user && !user.image && <img className="rounded-circle fw-300 me-2" style={{height:'50px',width:'50px'}}src="/defaultprofilepic.png" /> }

                                                {/* <img className="rounded-circle fw-300" style={{height:'50px',width:'50px'}} 
                                                    src={freelancer.image}
                                                ></img> */}
                                            </div>
                                            <div className="col-md-10">
                                                <input type="text" 
                                                value={comment}
                                                onChange={(e)=>setComment(e.target.value)}
                                                className="form-control" style={{ backgroundColor:'#F7F8F9'}} />
                                            </div>
                                            <br/>
                                            <div className="col-md-2">
                                                <button className="btn btn-primary" onClick={(e)=>updateComment(e)}>
                                                    Submit
                                                </button>
                                            </div>
                                           
                                        </div>
                                    </h6>

                                </div>
                            </div>

                            <div className="col-md-3">
                                ACTIONS

                                <ul className="list-unstyled">
                                    <li>
                                        <button className="btn serviceModalButton mb-1" > 
                                        <i className="bi bi-pen-fill"></i>
                                        &nbsp; Edit </button>
                                    </li>
                                    <li>
                                        <button className="btn serviceModalButton mb-1"> 
                                        <i className="bi bi-clipboard"></i>
                                        &nbsp; Copy </button>
                                    </li>
                                    <li>
                                        <button className="btn serviceModalButton mb-1"> 
                                        <i className="bi bi-share"></i>
                                        &nbsp; Share </button>
                                    </li>
                                    <li>
                                        <button className="btn serviceModalButton mb-1"> 
                                        <i className="bi bi-bell-fill"></i>
                                        &nbsp; Notification </button>
                                    </li>
                                </ul>
                            </div>

                        </div>

                       

                </Modal.Body>
            
        </Modal>
            </>
    )
}