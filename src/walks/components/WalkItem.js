import React from 'react'

import Card from '../../shared/components/UIElements/Card'
import './WalkItem.css'

const WalkItem = props => {
    return <li className="walk-item">
        <Card className="walk-item__content">
        <div className="walk-item__image">
            <img src={props.image} alt={props.title} />
        </div>
        <div className="walk-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
        </div>
        <div className="walk-item__actions">
            <button>VIEW ON MAP</button>
            <button>EDIT</button>
            <button>DELETE</button>
        </div> 
        </Card>
    </li>
}

export default WalkItem
