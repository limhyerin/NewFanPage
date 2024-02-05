import React from "react";
import { Provider } from 'react-redux';
import store from './redux/config/configStore';
import Header from "./components/Header";
import Member from "./components/Member";
import Main from "./components/Main";
import Footer from "./components/Footer";
import styled from "styled-components";
import './App.css';

const StyledContainer = styled.div`
    background-color: #82718f;
`;

const StyledBox = styled.div`
    width: 92%;
    margin: 10px auto auto auto;
    border-radius: 8px;
    border: 3px solid transparent;
    background-color: #0000007b;
`;

const StyledInputLetterContainer = styled.div`
    display: flex;
`;

function App() {
  return (
    <Provider store={store}>
      <StyledContainer>
        <Header />
        <StyledBox>
          <Member />
          <StyledInputLetterContainer>
            <Main/>
            <Footer/>
          </StyledInputLetterContainer>
        </StyledBox>
      </StyledContainer>
    </Provider>
  );
}

export default App;