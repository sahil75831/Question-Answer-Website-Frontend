import React, { useContext } from 'react'
import { UserContext } from '../UserContextProvider'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {useInformation , setUserInformation} = useContext(UserContext)
    const navigate = useNavigate()
    if(! useInformation) navigate('/login')    
}

export default ProtectedRoute
