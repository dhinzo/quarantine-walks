import React, { useState } from 'react'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'
import './WalkItem.css'

const WalkItem = props => {
    const [showMap, setShowMap] = useState(false)

    const openMapHandler = () => setShowMap(true)
    const closeMapHandler = () => setShowMap(false)


    return (
        <React.Fragment>
            <Modal 
                show={showMap} 
                onCancel={closeMapHandler} 
                header={props.address}
                contentClass="walk-item__modal-content" 
                footClass="walk-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal>
        <li className="walk-item">
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
                <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                <Button to={`/walks/${props.id}`}>EDIT</Button>
                <Button danger>DELETE</Button>
            </div> 
            </Card>
        </li>
        </React.Fragment>
    )}

export default WalkItem
