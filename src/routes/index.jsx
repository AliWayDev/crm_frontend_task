import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard } from "../pages/dashboard";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import useAuthStore from "../global/store/authStore";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    return children
};

export const IndexRoutes = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route index path="/login" element={<Login />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};
