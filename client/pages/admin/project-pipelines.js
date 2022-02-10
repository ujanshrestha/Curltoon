import Head from "next/head";
import { useEffect, useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import useDataFetch from "../../hooks/useDataFetch";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import useAccessCheck from "../../hooks/useAccessCheck";
import AccessNotAllowed from "../../components/AccessNotAllowed";
import Loader from "../../components/Loader";
import Card from "react-bootstrap/Card";


export default function ProjectPipelines(){

    const access = useAccessCheck("admin");

    const {data,error,loaded,setLoaded} = useDataFetch("/api/admin/pipeline-types");

    const [name,setName] = useState("");
    const [description,setDescription] = useState("");

    const [id,setId] = useState(null);

    const [modalShow, setModalShow] = useState(false);
    const handleModalClose = () => { 
        setName("");
        setDescription("");
        setModalShow(false);
    }   
    const handleModalShow = () =>  setModalShow(true);

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('/api/admin/pipeline-types',{id,name,description})
        .then(response =>
           { 
            if (response.status==200){
                handleModalClose();
                alert(id?"Pipeline Updated": "Pipeline Added");
                setId(null);
                setLoaded(false);
            }
           }
        );
    }

    const openEditModal = (evt,pipeline) => {
        setId(pipeline._id);
        setName(pipeline.name);
        setDescription(pipeline.description);
        handleModalShow();
    }


    if (access==null){
        return (<>
            <Loader />
        </>);
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
                    >
                        <Card className="mb-2">
                            <Card.Body>
                                <div className="row">
                                    <div className="col-md-8">
                                        <span className="h4">   Project Pipelines  </span>
                                    </div>
                                    <div className="col-md-4">
                                        <button onClick={handleModalShow} className="btn btn-primary">Create</button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card
                            style={{minHeight:"100px"}}
                        >
                            <Card.Body>
                        {loaded && data.length>0 && <>
                        <Table 
                        className="p-2"
                        striped bordered hover 
                        style={{backgroundColor:"#fff"}}
                        >
                            <thead> 
                                <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((e,i)=> 
                                <tr key={e._id}>
                                    <td>{i+1}</td>
                                    <td>{e.name}</td>
                                    <td>{e.description}</td>
                                    <td>
                                        <Link href={"/admin/pipeline-steps?id="+e._id}
                                          >
                                            <a className="btn btn-secondary">
                                                View Steps
                                            </a>
                                        </Link>
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
                        {!loaded && <>
                            <Loader />
                        </>}
                        </Card.Body>
                        </Card>
                    </div>
            </div>

        <Modal show={modalShow} onHide={handleModalClose}>
            <Modal.Header closeButton style={{border:'none'}}>
            <Modal.Title >
            {id ? <>Update Pipeline</> :  <>Create New Pipeline</>}        
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
                    <label htmlFor="description" className="form-label text-muted">Description</label>
                    <textarea type="text"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    placeholder="Description" className="form-control"
                    />
                </div>
            <button className="btn btn-primary">
                {id ? <>Edit</> :  <>Create</>}
            </button>
            </form>

            </Modal.Body>
        
        </Modal>

        </>);
    }
}