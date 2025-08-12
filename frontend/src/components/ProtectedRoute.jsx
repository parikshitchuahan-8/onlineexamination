import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();

    if (auth.isAuthLoading) {
        return <div className="text-center mt-10">Loading authentication status...</div>;
    }

    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};
export default ProtectedRoute;