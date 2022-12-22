import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContextProvider from '../src/contexts/AppContext';



function App() {
  return (
    <Router>
      <AppContextProvider>
        <Routes>
          <Route></Route>
        </Routes>
      </AppContextProvider>
    </Router>
  )
}

export default App;
