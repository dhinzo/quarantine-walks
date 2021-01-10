import React, { useState, useContext } from 'react'

import { VALIDATOR_EMAIL, VALIDATOR_MIN, VALIDATOR_REQUIRE } from '../../shared/utils/validators'
import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/auth-context'
import './Auth.css'

const Auth = () => {
    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(true)
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

    const authSubmitHandler = e => {
        e.preventDefault()
        console.log(formState.inputs)
        auth.login()
    }

    return (
        <Card className="authentication">
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