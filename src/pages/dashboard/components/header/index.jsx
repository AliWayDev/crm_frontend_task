import React from 'react'
import useAuthStore from '../../../../global/store/authStore';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();
    const name = localStorage.getItem('name')

    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="my-4 flex justify-end items-baseline gap-6">
            <p className="font-semibold text-xl">
                Hello, {name}!
            </p>
            <button onClick={() => handleLogout()} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Logout</button>
        </div>
    )
}
