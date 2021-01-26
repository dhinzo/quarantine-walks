import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'

import WalkList from '../components/WalkList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'


const UserWalks = () => {
    const [loadedWalks, setLoadedWalks] = useState()
    const { isLoading, error, sendReq, clearError } = useHttpClient()

    const userId = useParams().userId

    useEffect(() => {
        const fetchWalks = async () => {
            try {
                const responseData = await sendReq(process.env.REACT_APP_BACKEND_URL + `/walks/user/${userId}`)
                setLoadedWalks(responseData.walks)
            } catch (err) {}
        }
        fetchWalks()
    }, [sendReq, userId])

    const walkDeleteHandler = (deletedWalkId) => {
        setLoadedWalks(prevWalks => prevWalks.filter(walk => walk.id !== deletedWalkId)
        )
    }

    return (
    <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && (
        <div className='center'>
            <LoadingSpinner />
        </div>
    )}
        {!isLoading && loadedWalks && <WalkList items={loadedWalks} onDeleteWalk={walkDeleteHandler} />}
    </React.Fragment>
    )
}

export default UserWalks
