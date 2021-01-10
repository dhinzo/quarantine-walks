import React from 'react'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators'
import { useForm } from '../../shared/hooks/form-hook'
import './WalkForm.css'




const NewWalk = () => {
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
    
        
    
    

    const walkSubmitHandler = e => {
        e.preventDefault()
        console.log(formState.inputs)
    }

    return <form className="walk-form" onSubmit={walkSubmitHandler}>
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
}

export default NewWalk
