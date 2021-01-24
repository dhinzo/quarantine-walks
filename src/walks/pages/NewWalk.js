import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'
import './WalkForm.css'




const NewWalk = () => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendReq, clearError } = useHttpClient()
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }
        },
        false       
    )
    
    const history = useHistory()
    

    const walkSubmitHandler = async e => {
        e.preventDefault()
        try {
            await sendReq('http://localhost:5000/api/walks', 'POST', JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
            address: formState.inputs.address.value,
            creator: auth.userId
        }),
        {"Content-Type": "application/json"}
        )  
        history.push('/')  
        } catch (err) {}
    }

    return (
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <form className="walk-form" onSubmit={walkSubmitHandler}>
        { isLoading && <LoadingSpinner asOverlay /> }
            <Input
                id="title" 
                element="input" 
                type="text" 
                label="Title" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Please enter a valid title."
                onInput={inputHandler}              
            /> 
            <Input
                id="description" 
                element="textarea"  
                label="Description" 
                validators={[VALIDATOR_MINLENGTH(5)]} 
                errorText="Please enter a valid description with at least 5 characters."
                onInput={inputHandler}              
            />
            <Input
                id="address" 
                element="input"  
                label="Address" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Please enter a valid address."
                onInput={inputHandler}              
            />
            <Button type="submit" disabled={!formState.isValid}>ADD WALK</Button> 
        </form>
    </React.Fragment>
    )
}

export default NewWalk
