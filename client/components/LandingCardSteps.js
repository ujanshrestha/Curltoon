import React, { useState } from 'react'

export default function LandingCardSteps(props) {
    const [display,setDisplay] = useState(false)

    return (
        <div>
            
        <div className="row">
        <h6 onClick={()=> setDisplay(!display)} style={{cursor:'pointer'}}> {props.step.number} {props.step.title} </h6>

            <div className="col-md-5" style={{display:display?'block':'none'}}>
                <div>
                        {props.step.leftBody}
                </div>
                
            </div>
            <div className="col-md-7" style={{display:display?'block':'none'}}>
                        {props.step.rightBody}
            </div>
        </div>
     </div>
    )
}
