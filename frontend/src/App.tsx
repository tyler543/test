// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import TestPage from './pages/TestPage';
import RegisterPage from './pages/RegisterPage';
function App() {
return (
<Router>
<Routes>
<Route path="/" element={<LandingPage />} />
<Route path="/login" element={<LoginPage />} />
<Route path="/cards" element={<CardPage />} />
<Route path="*" element={<Navigate to="/" />} />
<Route path="/test" element={<TestPage />} />
<Route path="/register" element={<RegisterPage />} />
</Routes>
</Router>
);
}
export default App;