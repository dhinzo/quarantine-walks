import React from 'react'

import Card from '../../shared/components/UIElements/Card'
import WalkItem from './WalkItem'
import './WalkList.css'

const WalkList = props => {
    if (props.items.length === 0) {
        return <div className="walk-list center">
            <Card>
                <h2>No Walks found. Consider creating one!</h2>
                <button>Share Walk</button>
            </Card>
        </div>
    }

    return <ul className="walk-list">
        {props.items.map(walk => (
            <WalkItem 
                key={walk.id} 
                id={walk.id} 
                image={walk.imageUrl} 
                title={walk.title} 
                description={walk.description} 
                address={walk.address} 
                creatorId={walk.creator} 
                coordinates={walk.location}            
            />
        ))}
    </ul>
}

export default WalkList
