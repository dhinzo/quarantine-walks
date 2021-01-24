import React from 'react'

import Card from '../../shared/components/UIElements/Card'
import WalkItem from './WalkItem'
import Button from '../../shared/components/FormElements/Button'
import './WalkList.css'

const WalkList = props => {
    if (props.items.length === 0) {
        return <div className="walk-list center">
            <Card>
                <h2>No Walks found. Consider creating one!</h2>
                <Button to="/walks/new" >Share Walk</Button>
            </Card>
        </div>
    }

    return <ul className="walk-list">
        {props.items.map(walk => (
            <WalkItem 
                key={walk.id} 
                id={walk.id} 
                image={walk.image} 
                title={walk.title} 
                description={walk.description} 
                address={walk.address} 
                creatorId={walk.creator} 
                coordinates={walk.location}
                onDelete={props.onDeleteWalk}            
            />
        ))}
    </ul>
}

export default WalkList
