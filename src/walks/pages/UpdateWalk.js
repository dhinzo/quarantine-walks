import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators'
import { useForm } from '../../shared/hooks/form-hook'
import './WalkForm.css'


const DUMMY_DATA = [
    {
        id: 'w1',
        title: 'Lakeview Cemetery',
        description: 'A beautiful cemetery to walk around. Rockefeller family is buried here!',
        imageUrl: 'http://ianadamsphotography.com/news/wp-content/uploads/2015/11/Schofield-Mausoleum-Edit.jpg',
        address: '12316 Euclid Avenue, Cleveland, Ohio 44106',
        location: {
            lat: 41.511623,
            lng: -81.6015392
        },
        creator: 'u1'
    },
    {
        id: 'w2',
        title: 'Lakeview Cemetery',
        description: 'A beautiful cemetery to walk around. Rockefeller family is buried here!',
        imageUrl: 'http://ianadamsphotography.com/news/wp-content/uploads/2015/11/Schofield-Mausoleum-Edit.jpg',
        address: '12316 Euclid Avenue, Cleveland, Ohio 44106',
        location: {
            lat: 41.511623,
            lng: -81.6015392
        },
        creator: 'u2'
    }
]

const UpdateWalk = () => {
    const [isLoading, setIsLoading] = useState(true)
    const walkId = useParams().walkId
    
    
    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, 
    false
)
    


    const walkToUpdate = DUMMY_DATA.find(w => w.id === walkId)

    useEffect(() => {
        if (walkToUpdate) {
            setFormData(
                {
                    title: {
                        value: walkToUpdate.title,
                        isValid: true
                    },
                    description: {
                        value: walkToUpdate.description,
                        isValid: true
                    }
                }, true
            )
        }        
        setIsLoading(false)
    }, [setFormData, walkToUpdate])

    const walkUpdateSubmitHandler = e => {
        e.preventDefault()
        console.log(formState.inputs)
    }

    if (!walkToUpdate) {
        return (
            <div className="center">
            <Card>
                <h2>Could not find this particular walk...</h2>
            </Card>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        <form className="walk-form" onSubmit={walkUpdateSubmitHandler}>
            <Input            
                id="title" 
                element="input" 
                type="text" 
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid} />
            <Input            
                id="description" 
                element="textarea" 
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description with a minimum of 5 characters."
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid} />
            <Button type="submit" disabled={!formState.isValid}>
                UPDATE WALK
            </Button>
        </form>
    )
}

export default UpdateWalk