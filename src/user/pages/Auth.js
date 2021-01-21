import React, { useState, useContext } from 'react'

import { VALIDATOR_EMAIL, VALIDATOR_MIN, VALIDATOR_REQUIRE } from '../../shared/utils/validators'
import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/auth-context'
import './Auth.css'

const Auth = () => {
    
    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()


    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    )

const switchHandler = () => {
    if (!isLoginMode) {
        setFormData({
            ...formState.inputs,
            name: undefined    
        }, formState.inputs.email.isValid && formState.inputs.password.isValid
        )
    } else {
        setFormData({
            ...formState.inputs,
            name: {
                value: '',
                isValid: false
            }
        }, 
        false
        )
    }
    setIsLoginMode(prevMode => !prevMode)
}

const authSubmitHandler = async e => {
    e.preventDefault()
    
    if (isLoginMode) {

    } else {
        try{
            setIsLoading(true)
            const response = await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formState.inputs.name.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
            })
        })
        const resData = await response.json()
        console.log(resData)
        setIsLoading(false)
        auth.login()
        } catch (err) {
            console.log(err)
            setIsLoading(false)
            setError(err.message || "Something's not right... try again.")
        }
    }    
}

    return (
        <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay/>}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
            <Input
                element="input"
                id="name"
                type="text"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name"
                onInput={inputHandler} />
        )} 
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
            <Button type="submit" disabled={!formState.isValid}>
                {isLoginMode ? 'LOGIN' : 'SIGN UP'}
            </Button> 
        </form>
        <Button inverse onClick={switchHandler}>Switch to {isLoginMode ? 'SIGN UP' : 'LOGIN'}</Button>
        </Card>
    )
}

export default Auth