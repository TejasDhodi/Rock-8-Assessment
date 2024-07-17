import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({Component}) => {

    const userToken = useSelector(state => state.authentication.authToken);
    const navigate = useNavigate();

    useEffect(() => {
        if(!userToken) {
            navigate('/login')
        }
    }, [userToken])
  return <Component />
}

export default ProtectedRoute
