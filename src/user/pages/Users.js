import React from 'react'
import UsersList from '../components/UsersList'

const Users = () => {
    const USERS = [
        {
            id: 'u1', 
            name: 'devin', 
            image: 'https://i.imgur.com/uQRW1UC.jpg', 
            walks: 2
        }
    ]

    return <UsersList
                items={USERS}
    />
}

export default Users