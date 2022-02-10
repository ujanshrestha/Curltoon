import Head from "next/head";
import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/Admin/AdminSidebar";
import Table from 'react-bootstrap/Table';
import useDataFetch from "../../../hooks/useDataFetch";
import AccessNotAllowed from "../../../components/AccessNotAllowed";
import useAccessCheck from "../../../hooks/useAccessCheck";
import Loader from "../../../components/Loader";
import Card from "react-bootstrap/Card";

export default function EntrepreneurList(){

    const {data,error,loaded} = useDataFetch("/api/admin/entrepreneur");

    const access = useAccessCheck("admin");


    if (access==true){
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
                        <div className="p-2 contentContainer" 
                        // style={{backgroundColor:"#fff"}}
                        >
                            <Card className="mb-2">
                                <Card.Body>
                                    <div className="col-md-3">
                                        <h4> Entrepreneur List </h4>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card
                                style={{minHeight:"100px"}}
                            >
                                <Card.Body>
                            {loaded && data.length>0 && <>
                            <Table striped bordered hover 
                            style={{backgroundColor:"#fff"}}
                            >
                                <thead> 
                                    <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Display Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((e,i)=> 
                                    <tr key={e._id}>
                                        <td>{i+1}</td>
                                        <td>{e.name}</td>
                                        <td>{e.displayName} </td>
                                        <td>{e.phoneNumber}</td>
                                        <td>{e.email}</td>
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
        
        
            </div>);
        }
    else if (access==false){
        return (
            <>
                <AccessNotAllowed />
            </>
        )
    }
    else {
        return (
            <>
                <Loader />
            </>
        )
    }
}