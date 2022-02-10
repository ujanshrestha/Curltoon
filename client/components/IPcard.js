import React from 'react';
import Card from 'react-bootstrap/Card';


export default function IPcard(props) {
    let imgSrc= "/ipImg1.jpg";
    if (props.image != undefined) imgSrc= props.image;
    return (
            <Card className="mb-3">
            <Card.Img variant="top" src={imgSrc} className="ipCardImg"/>
            <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>
                {props.description}
            </Card.Text>
            </Card.Body>
        </Card>
    )
}

