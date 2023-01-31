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
                  {/* <WelcomeText>
                   Bem-vindo! */}
                  <LoginPage />
                  {/* </WelcomeText> */}
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

// const WelcomeText = styled.h2`
//   margin: 8rem 0 2rem 0;
// `;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

// const ButtonContainer = styled.section`
//   margin: 1rem 0 2rem 0;
//   width: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

export default App;
