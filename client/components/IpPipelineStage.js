import axios from "axios";
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';

export default function IpPipelineStage(props){

    const [stageLoaded,setStageLoaded] = useState(false);
    const [currentStage,setCurrentStage] = useState([]);
    const [newStage,setNewStage] = useState({
        currentStage: "",
        currentStageDueDate: "",
        currentStageFreelancer: "",
        totalBudget: "",
        dueDate: "",
    });


  

    const handleSubmit = (e) => {
        let prevId;
        e.preventDefault();
         if (Object.keys(currentStage).length === 0)
        {
            prevId = "null";
        }
        else {
            prevId = currentStage._id;
        }

        axios.post('/api/entrepreneur/lab/staging/'+props.id+'/'+prevId, newStage)
        .then(response =>
           { console.log("saved",response);
           }
        );
    }

    const [infoModalShow, setInfoModalShow] = useState(false);

    const handleInfoModalClose = () => setInfoModalShow(false);
    const handleInfoModalShow = () =>  setInfoModalShow(true);

    async function fetchStage () {
        const res = await fetch("/api/entrepreneur/lab/staging/"+ props.id, {
              credentials: 'include',
              method: 'GET', 
              headers: {
                  'Content-Type': 'application/json',
              }
          });
        const data = await res.json();
        if (data==null){
            console.log("null here",data);
            setStageLoaded(true);
        }
        else {
        if (!data.errors)
        {
            setStageLoaded(true);
            setCurrentStage(data);
            console.log("fetched state",data);
            if (Object.keys(data).length !== 0)
            {
               for (const [key, value] of Object.entries(data)) {
                   if (key!="_id" && key !="currentStageFreelancer" && key !="_v")
                   {
                       if (key == "dueDate" || key == "currentStageDueDate"){
                            console.log(key,value);
                            const todayDate = new Date(value); 
                            const formatDate = todayDate.getDate() < 10 ? `0${todayDate.getDate()}`:todayDate.getDate();
                            const formatMonth = todayDate.getMonth() < 10 ? `0${todayDate.getMonth()+1}`: todayDate.getMonth()+1;
                            const formattedDate = [todayDate.getFullYear(), formatMonth, formatDate].join('-');

                            console.log(formattedDate);
                            loadStageValue(key,formattedDate);
                       }
                       else {
                        loadStageValue(key,value);
                       }
                   }
              }
            }
        
            //change New State

        }
        }
    }

    const handleFormChange = e => {
        const { name, value } = e.target;
        setNewStage(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const formatDate = (dateMongoString) => {
        const todayDate = new Date(dateMongoString); 
        const formatDate = todayDate.getDate() < 10 ? `0${todayDate.getDate()}`:todayDate.getDate();
        const formatMonth = todayDate.getMonth() < 10 ? `0${todayDate.getMonth()+1}`: todayDate.getMonth()+1;
        const formattedDate = [todayDate.getFullYear(), formatMonth, formatDate].join('-');
        return formattedDate;
    }


    const loadStageValue = (n,value) => {
        setNewStage(prevState => ({
            ...prevState,
            [n]: value,
        }));
    }

    useEffect(()=>{
        if (!stageLoaded && props.id){
            fetchStage();
        }

    },[stageLoaded,props.id]);


    return (<>

    {stageLoaded && (<>
    <div className="ipStagingContainer bg-primary bg-gradient rounded d-flex align-items-center justify-content-between"
         role="button"
         onClick={handleInfoModalShow}
     >
         <div
         className="p-3 border-end"
         // key={stageBannerIndex}
         >
             {(currentStage.currentStage != undefined) && currentStage.currentStage}
             <span className="d-block fw-100 opacity-75"> 
              Current Stage
             </span>
         </div>

         <div
         className="p-3 border-end"
         // key={stageBannerIndex}
         >
             {(currentStage.currentStageDueDate != undefined) && formatDate(currentStage.currentStageDueDate)}
             <span className="d-block fw-100 opacity-75"> 
             Current Stage Due Date
             </span>
         </div>

         <div
         className="p-3 border-end"
         // key={stageBannerIndex}
         >
             {(currentStage.currentStageFreelancer != undefined) && currentStage.currentStageFreelancer.name}
             
             {/* val here */}
             <span className="d-block fw-100 opacity-75"> 
             Current Stage Freelancer
             </span>
         </div>


         <div
         className="p-3 border-end"
         // key={stageBannerIndex}
         >
             {(currentStage.totalBudget != undefined) && currentStage.totalBudget}

             {/* val here */}
             <span className="d-block fw-100 opacity-75"> 
             Total Budget
             </span>
         </div>


         <div
         className="p-3 border-end"
         // key={stageBannerIndex}
         >
             {(currentStage.dueDate != undefined) && formatDate(currentStage.dueDate)}
             {/* val here */}
             <span className="d-block fw-100 opacity-75"> 
             Due Date
             </span>
         </div>
     </div></>)}


     <Modal show={infoModalShow} onHide={handleInfoModalClose}>
            <Modal.Header closeButton style={{border:'none'}}>
            <Modal.Title >
              IP Staging
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <form onSubmit={handleSubmit}>  
              
                <div className="mb-3">

                    <select
                    name="currentStage"
                     value={newStage.currentStage} 
                    onChange={(e) => handleFormChange(e)}
                    className="form-control">
                    <option value="">Stage</option>
                                            {projectStages.map((p,index)=> 
                                            <option key={index} value={p.value}>{p.label}</option>
                                            )}
                    </select>
                                                 
                </div>

                <div className="mb-3">
                                <label htmlFor="currentStageDueDate" className="form-label text-muted">Current Stage Due Date</label>
                                <input type="date" value={newStage.currentStageDueDate}
                                                            onChange={(e) => handleFormChange(e)}
                                                            name="currentStageDueDate"
                                                            className="form-control" id="currentStageDueDate"
                                                        />
              
                </div>

                {/* <div className="mb-3">
                           <label htmlFor="currentStageFreelancer" className="form-label text-muted">Current Stage Freelancer</label>
                                      <input type="text" value={newStage.currentStageFreelancer}
                                                            onChange={(e) => handleFormChange(e)}
                                                            name="currentStageFreelancer"
                                                            className="form-control" id="currentStageFreelancer"
                                        />
                </div> */}

                <div className="mb-3">

                                <label htmlFor="totalBudget" className="form-label text-muted">Total Budget</label>
                                <input type="number" value={newStage.totalBudget}
                                                            onChange={(e) => handleFormChange(e)}
                                                            name="totalBudget"
                                                            className="form-control" id="totalBudget"
                                />
                </div>

                <div className="mb-3">
                                <label htmlFor="dueDate" className="form-label text-muted">Due Date</label>
                                <input type="date" value={newStage.dueDate}
                                                            onChange={(e) => handleFormChange(e)}
                                                            name="dueDate"
                                                            className="form-control" id="dueDate"
                                                        />
                </div>

                <button className="btn btn-primary">
                    Save
                </button>


            </form>

                   

                

            </Modal.Body>
        
        </Modal>
     </>)
}

const projectStages = [
    {"label":"Processing","value":"processing"},
    {"label":"Packaging","value":"packaging"},
]