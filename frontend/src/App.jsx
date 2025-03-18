import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';

import { Toaster } from 'react-hot-toast';
import { Loader } from 'lucide-react';

import Home from './pages/Home';
import Wardrobe from './pages/Wardrobe';
import AddItem from './pages/AddItem';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import Recommendations from './pages/Recommendation';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';


const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <div >
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/wardrobe" element={authUser ? <Wardrobe /> : <Navigate to="/login" />} />
        <Route path="/add-item" element={authUser ? <AddItem /> : <Navigate to="/login" />} />
        <Route path="/favorites" element={authUser ? <Favorites /> : <Navigate to="/login" />} />
        <Route path="/recommendations" element={authUser ? <Recommendations /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
     
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;