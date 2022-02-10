import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
export default function LandingCard(props) {
    const [display,setDisplay] = useState(false)
    return (
        <div className="landingCardContainer mb-2">
        <Card>
          <Card.Header style={{cursor:'pointer'}} onClick={()=>setDisplay(!display)}>
          <div className="row">
            <div className="col-md-6">
              <img src={props.card.image} height="20px"/> 
              &nbsp; {props.card.title}
            </div>
          <div className="col-md-6">
          <span className="text-right text-muted"> 
              {props.card.rightText}
          </span>
          </div>
          </div>
          </Card.Header>

          <Card.Body style={{display:display?'block':'none'}}>
            {props.card.rfc}
          </Card.Body>
        </Card>
    </div>
    )
}
