import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import ChatContextProvider from './ChatContext';
const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useSelector((state) => state.auth);

    let location = useLocation();
    if(!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return (
    <ChatContextProvider>
        {children}
    </ChatContextProvider>
 )

};

export default ProtectedRoute;