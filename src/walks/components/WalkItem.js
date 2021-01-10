import React, { useState, useContext } from 'react'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'
import { AuthContext } from '../../shared/context/auth-context'
import './WalkItem.css'

const WalkItem = props => {
    const auth = useContext(AuthContext)
    const [showMap, setShowMap] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const openMapHandler = () => setShowMap(true)
    const closeMapHandler = () => setShowMap(false)

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true)
    }

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false)
    }

    const confirmDeleteHandler = () => {
        setShowConfirmModal(false)
        console.log('Deleting...')
    }

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
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Sure about that?" 
                footerClass="walk-item__modal-actions" 
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </React.Fragment>
                }>
                <p>Are you sure you want to delete this walk? This can't be undone.</p>
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
                {auth.isLoggedIn &&
                <React.Fragment>
                <Button to={`/walks/${props.id}`}>EDIT</Button>
                <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                </React.Fragment>
                }
            </div> 
            </Card>
        </li>
        </React.Fragment>
    )}

export default WalkItem
