import React from 'react'
import LandingCardSteps from './LandingCardSteps'

export default function IPCreateLandingCard() {
    return (
        <>
        {steps.map((step,index) =>
            <LandingCardSteps key={index} step={step} />
            )}
        </>
    )
}

const steps = [
    {"number":"1",
    "title": "Pick a blue print and title",
    "rightBody": <>
      <img src="/ipImg1.jpg" height="180px"/>
    </>,
    "leftBody":<>
    Lorem ipsum
    <button className="btn btn-primary">Create an IP</button>
    </>},
    {"number":"2",
    "title": "Lorem ipsum 2",
    "rightBody": <>
        <img src="/ipImg2.jpg" height="150px"/>
    </>,
    "leftBody":<>
        Est pellentesque elit ullamcorper dignissim cras. Netus et malesuada fames ac turpis egestas sed. Tempor commodo ullamcorper a lacus vestibulum sed. Posuere morbi leo urna molestie at elementum eu facilisis sed.
    </>},
    {"number":"3",
     "title": "Lorem ipsum 3",
     "rightBody": <>
         <img src="/ipImg3.jpg" height="150px"/>
     </>,
     "leftBody":<>
        Est pellentesque elit ullamcorper dignissim cras.
        Netus et malesuada fames ac turpis egestas sed. Tempor commodo ullamcorper a lacus vestibulum sed. Posuere morbi leo urna molestie at elementum eu facilisis sed.
     </>},
]
