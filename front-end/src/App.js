import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContextProvider from '../src/contexts/AppContext';
import LoginPage from './pages/Login';
import LandingPage from './pages/LandingPage';
import TasksPage from './pages/Tasks';
import RegisterPage from './pages/Resgister';

function App() {
  return (
    <Router>
      <AppContextProvider>
        <Routes>
        <Route exact path="/" element={ <LandingPage /> } />
        <Route exact path="/login" element={ <LoginPage /> } />
        <Route exact path="/tasks" element={ <TasksPage /> } />
        <Route exact path="/register" element={ <RegisterPage /> } />
        </Routes>
      </AppContextProvider>
    </Router>
  )
}

export default App;
