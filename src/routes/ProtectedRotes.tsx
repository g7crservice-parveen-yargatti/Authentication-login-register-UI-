import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isLoggedIn } from '../config'



const ProtectedRoutes = (props: any) => {
    const location = useLocation()
    const url = location.pathname.split('/')[1]
    const status = isLoggedIn()
   
    
    return (
         <>
            {
                status ? <props.layout />:<Navigate to={`/SignIn?returnUrl=${url}`} />
            }
        </>
    )
}

export default ProtectedRoutes