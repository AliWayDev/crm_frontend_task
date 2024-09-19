// authStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    login: (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        localStorage.setItem('id', data.id);
        set({ token: data.token, isAuthenticated: true });
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('id');
        set({ token: null, isAuthenticated: false });
    },
}));

export default useAuthStore;
