import React from 'react'
import { useContext } from 'react'
import UserContext from '../../Context/User/UserContext'

export const Help = () => {

    const { user } = useContext(UserContext);
    
    return (
        <div className='container'>
            <h1>Help Page</h1>
            <img src={user?.photoURL} alt={user?.displayName} />
            <p>Uid: {user?.uid}</p>
            <p>Nombre: {user?.displayName}</p>
            <p>Correo: {user?.email}</p>
        </div>
    )
}
