import React, { useState, useEffect } from 'react'
import { createContext } from 'react'

const UserContext = createContext()

const UserContextProvider = ({children}) => {
  const [userInformation, setUserInformation] = useState()
  
  return (
    <UserContext.Provider value={{userInformation, setUserInformation }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
export {UserContext}
