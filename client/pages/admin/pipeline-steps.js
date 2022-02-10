import Head from "next/head";
import { useEffect, useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import Table from 'react-bootstrap/Table';
import { useRouter } from "next/router";
import Link from "next/link";
import  Modal  from "react-bootstrap/Modal";
import axios from "axios";
import useAccessCheck from "../../hooks/useAccessCheck";
import AccessNotAllowed from "../../components/AccessNotAllowed";
import Loader from "../../components/Loader";
import Card from "react-bootstrap/Card";


export default function PipelineSteps(){

    const access = useAccessCheck("admin");

    // let draggedOnEle;

    const [draggedEle,setDraggedEle] = useState(null);
    const [draggedOnEle,setDraggedOnEle] = useState(null);


    const [currentId,setCurrentId] = useState(null);

    const [name,setName] = useState("");
    const [description,setDescription] = useState("");


    const [pipelines,setPipelines] = useState([]);
    const [pipelineType,setPipelineType] = useState();
    const [plsLoaded,setPlsLoaded] = useState(false);


    const router = useRouter();
    const {id} = router.query;

    const [modalShow, setModalShow] = useState(false);
    const handleModalClose = () => { 
        setModalShow(false);
        setName("");
        setDescription("");
        setCurrentId(null);
    }   
    
    const handleModalShow = () =>  setModalShow(true);



    async function fetchPipelines () {
        const res = await fetch("/api/admin/pipeline-steps/"+id, {
              credentials: 'include',
              method: 'GET', 
              headers: {
                  'Content-Type': 'application/json',
              }
          });
        const data = await res.json();

        if (!data.errors)
        {
            setPipelines(data.pipelineSteps);
            setPipelineType(data.pipelineType);
            setPlsLoaded(true);
        }
    }

    useEffect(()=> {
        if (!plsLoaded && id){
            fetchPipelines();
        }
    },[plsLoaded,id])


    const handleSubmit = e => {
        e.preventDefault();

        axios.post('/api/admin/pipeline-steps', {name,currentId,description,pipelineType:id})
        .then(response =>
           { 
            console.log(response);
            if (response.status==200){
                handleModalClose();
                alert(currentId?"Pipeline Step Updated": "Pipeline Step Added");
                setCurrentId(null);
                setPlsLoaded(false);
            }
           }
        );
    }

    const openEditModal = (evt,pStep) => {
        setCurrentId(pStep._id);
        setName(pStep.name);
        setDescription(pStep.description);
        handleModalShow();
    }

    const onDragStart = (i) => {
        setDraggedEle(i);
    }

    const onDragOver = (i) => {
        if (i!=null){
            console.log(i);
            setDraggedOnEle(i);
            handleRowOrderChange();
        }
    }

    let tempPipelines = [...pipelines];
    const handleRowOrderChange = () => {
        if (draggedOnEle){
            console.log("draggedEle",draggedEle);
            console.log("draggedOnEle",draggedOnEle);
            console.log("draggedEle",pipelines[draggedEle]);
            console.log("draggedOnEle",pipelines[draggedOnEle]);
            
            // tempPipelines[draggedOnEle] = pipelines[draggedEle];
            // tempPipelines[draggedEle] = pipelines[draggedOnEle];
            // setPipelines(tempPipelines);
        }
    }

    const onDragEnd = (evt,row) => {
        //set null
        tempPipelines[draggedOnEle] = pipelines[draggedEle];
        tempPipelines[draggedEle] = pipelines[draggedOnEle];
        setPipelines(tempPipelines);
    }


    if (access==null){
        return (<>
        <Loader /></>);
    }

    else if (access==false){
      return ( <AccessNotAllowed />);
    }

    else {
    return (
        <>
          <Head>
            <title>Curltoon</title>
            <meta name="description" content="Curltoon" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
    
            <div className="row bg-contentbgColor">
                    <div className="p-0 sideBarContainer">
                     <AdminSidebar />
                    </div>
                    <div className="p-2 contentContainer" 
                    // style={{backgroundColor:"#fff"}}
                    >
                    <Card className="mb-2">
                        <Card.Body>
                        <div className="row">
                            <div className="col-md-8">
                                <Link href="/admin/project-pipelines"
                                    className=""
                                >  
                                 <a className="h4">   Project Pipelines  </a>
                                </Link>
                                / {pipelineType && pipelineType.name}  
                            </div>
                            {/* <div className="col-md-">

                            </div> */}
                            <div className="col-md-4">
                                <button onClick={handleModalShow} className="btn btn-primary">Create New Step</button>
                            </div>
                        </div>
                        </Card.Body>
                    </Card>

                        <Card
                            style={{minHeight:"100px"}}
                        >
                            <Card.Body>
                        {plsLoaded && pipelines.length>0 && <>
                        <Table striped bordered hover 
                        style={{backgroundColor:"#fff"}}
                        >
                            <thead> 
                                <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {pipelines.map((e,i)=> 
                                <tr 
                                    draggable
                                        onDragStart={(evt)=>onDragStart(i)}
                                        onDragOver={(evt)=>onDragOver(i)}
                                        onDragEnd={(evt)=>onDragEnd(evt,e)}
                                    key={e._id}>
                                    <td>{i+1}</td>
                                    <td>{e.name}</td>
                                    <td>{e.description}</td>
                                    <td>
                                    <button className="btn btn-primary mx-2"
                                        onClick={(evt)=>openEditModal(evt,e)}
                                        >
                                            Edit
                                    </button>
                                    </td>
                                </tr>)}
                            </tbody>
                            </Table>
                        </>}

                        {plsLoaded && pipelines.length==0 && <>
                        
                        <Card>
                            <Card.Body>
                                <div className="text-center text-danger"> No steps added
                                </div>
                            </Card.Body>
                        </Card>
                       </>}

                           {!plsLoaded && <>
                                <Loader />
                           </>}
                           </Card.Body>
                        </Card>
                    </div>
            </div>
        
        <Modal show={modalShow} onHide={handleModalClose}>
            <Modal.Header closeButton style={{border:'none'}}>
            <Modal.Title >
                {currentId ? <>Update Step</> :  <>  Create New Step</>}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label text-muted">Title</label>
                    <input type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    placeholder="Title" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label text-muted">Brief Description</label>
                    <textarea value={description}
                    onChange={(e)=>setDescription(e.target.value)} 
                    placeholder="Description" className="form-control"/>
                </div>
                <button className="btn btn-primary">
                    {currentId ? <>Edit</> :  <>Create</>}
                </button>
            </form>

            </Modal.Body>
        
        </Modal>

     
        </>);
    }
}