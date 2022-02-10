import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";

export default function PipelineCard(props) {
  const [modalShow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  return (
    <>
      <Card
        className='mb-3'
        onClick={handleModalShow}
        style={{ cursor: "pointer" }}
      >
        <Card.Img variant='top' src={props.image} className='ipCardImg' />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
        </Card.Body>
      </Card>
      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton style={{ border: "none" }}>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={props.image} className='w-100 mb-2'></img>
          <div>
            <div className='mb-2'>
              <h6>Description</h6>
              <p>lorem ipsum</p>
            </div>

       
          </div>
          <Link href={"/entrepreneur/studio/create?pipeline="+props.id}>
            <button className='btn btn-primary'> Create </button>
          </Link>
        </Modal.Body>
      </Modal>
    </>
  );
}
