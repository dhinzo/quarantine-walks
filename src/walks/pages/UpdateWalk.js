import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'


import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'

import './WalkForm.css'


const UpdateWalk = () => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendReq, clearError } = useHttpClient()
    const [loadedWalk, setLoadedWalk] = useState()
    const walkId = useParams().walkId
    const history = useHistory()
    
    
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
    
    useEffect(() => {
        const fetchWalk = async () => {
            try {
                const responseData = await sendReq(`http://localhost:5000/api/walks/${walkId}`)
                setLoadedWalk(responseData.walk)
                setFormData(
                    {
                        title: {
                            value: responseData.walk.title,
                            isValid: true
                        },
                        description: {
                            value: responseData.walk.description,
                            isValid: true
                        }
                    }, true
                )
            } catch (err) {}
        }
        fetchWalk()
    }, [sendReq, walkId, setFormData])


    const walkUpdateSubmitHandler = async e => {
        e.preventDefault()
        try {
            await sendReq(`http://localhost:5000/api/walks/${walkId}`, 'PATCH', JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value
            }),
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.token
            }
            )
            history.push(`/${auth.userId}/walks`)
        } catch (err) {}
    }

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        )
    }

    if (!loadedWalk && !error) {
        return (
            <div className="center">
            <Card>
                <h2>Could not find this particular walk...</h2>
            </Card>
            </div>
        )
    }

    return (
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />

        {!isLoading && loadedWalk &&(
            <form className="walk-form" onSubmit={walkUpdateSubmitHandler}>
            <Input            
                id="title" 
                element="input" 
                type="text" 
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
                initialValue={loadedWalk.title}
                initialValid={true} />
            <Input            
                id="description" 
                element="textarea" 
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description with a minimum of 5 characters."
                onInput={inputHandler}
                initialValue={loadedWalk.description}
                initialValid={true} />
            <Button type="submit" disabled={!formState.isValid}>
                UPDATE WALK
            </Button>
        </form>)}
        </React.Fragment>
    )
}

export default UpdateWalk