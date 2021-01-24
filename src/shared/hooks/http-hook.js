import { useState, useCallback, useRef, useEffect } from 'react'

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    // stores data across rerender cycles

    const activeHttpRequests = useRef([])

    // useCallback() to avoid infinite loops or not rerender after it's created
    const sendReq = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true)
        const httpAbortCtrl = new AbortController()
        activeHttpRequests.current.push(httpAbortCtrl)

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            })
            const resData = await response.json()

            // clear abortctrl after the req is compeleted
            activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCtrl => reqCtrl !== httpAbortCtrl
            )

            if (!response.ok) {
                throw new Error(resData.message)
            }
            setIsLoading(false)
            return resData
        } catch (err) {
            setError(err.message)
            setIsLoading(false)    
            throw err
        }
    }, [])


    const clearError = () => {
        setError(null)
    }

    // acts as clean up func before the component that uses this custom hook unmounts, or before useEffect() is called again
    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
        } 
    
    }, [])

    return { isLoading, error, sendReq, clearError }
}