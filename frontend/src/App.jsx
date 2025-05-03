import { useEffect, useState } from "react";
import "./index.css";
import { Navbar } from "./components/Navbar.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/storeUserAuth.js";
import { Toaster } from "react-hot-toast";

import { Loader } from "lucide-react";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import { useThemeStore } from "./store/storeUserTheme.js";

const App = () => {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
    const { theme } = useThemeStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth && !authUser) {
        <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin" />
        </div>;
    }

    return (
        <div data-theme={theme}>
            <Navbar />
            <Routes>
                <Route path="/" element={authUser ? <HomePage /> : < Navigate to={"/login"} />} />
                <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
                <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
                <Route path="/settings" element={authUser ? <SettingsPage /> : < Navigate to={"/login"} />} />
                <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
            </Routes>

            <Toaster />
        </div>
    );
};

export default App;
