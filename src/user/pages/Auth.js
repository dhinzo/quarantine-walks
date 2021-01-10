import React from 'react'

import { VALIDATOR_EMAIL, VALIDATOR_MIN } from '../../shared/utils/validators'
import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { useForm } from '../../shared/hooks/form-hook'
import './Auth.css'

const Auth = () => {
    const [formState, inputHandler] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        }
    )


    const authSubmitHandler = e => {
        e.preventDefault()
        console.log(formState.inputs)
    }

    return (
        <Card className="authentication">
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}> 
            <Input
                id="email"
                element="input"
                type="email"
                label="Email"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address"
                onInput={inputHandler} /> 
            <Input
                id="password"
                element="input"
                type="password"
                label="Password"
                validators={[VALIDATOR_MIN(8)]}
                errorText="Please enter a valid password with at least 8 characters"
                onInput={inputHandler} />
            <Button type="submit" disabled={!formState.isValid}>LOG IN</Button> 
        </form>
        </Card>
    )
}

export default Auth