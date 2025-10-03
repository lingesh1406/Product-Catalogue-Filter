

import React from 'react'
import { Navigate } from 'react-router-dom';

 const RequiredUser = ({children}) => {

    const validUser = localStorage.getItem('Token');

    
    if(validUser == null ){
        return <Navigate to={"/login"}/>
    }

    return children;

}

export default RequiredUser;