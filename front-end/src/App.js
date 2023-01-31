import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppContextProvider from "../src/contexts/AppContext";
import LoginPage from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import TasksPage from "./pages/Tasks";
import RegisterPage from "./pages/Resgister";
import styled from "styled-components";

function App() {
  return (
    <Router>
      <AppContextProvider>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route
            exact
            path="/login"
            element={
              <MainContainer>
                <InputContainer>
                  <LoginPage />
                 </InputContainer>
              </MainContainer>
            }
          />
          <Route exact path="/tasks" element={<TasksPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
        </Routes>
      </AppContextProvider>
    </Router>
  );
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 39, 135, 0.37);
  backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

export default App;
