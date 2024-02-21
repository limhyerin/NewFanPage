import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setNickName } from "../redux/modules/data";

const StyledContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  background-color: #e7e7e7;
  width: 600px;
  height: 400px;
  border-radius: 10px;
  margin: 100px auto 50px auto;
`;

const StyledInput = styled.input`
  width: 70%;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  width: 30%;
  margin-bottom: 10px;
`;

const StyledMove = styled.span`
  color: #0f40e0;
`;

const SignIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    // 서버로 사용자 정보 요청
    const response = await axios.get(`http://localhost:4000/users?email=${email}`);
    const users = response.data;

    // 입력한 이메일과 비밀번호로 사용자 인증
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      // 로그인 성공시
      const { nickName } = user;
      dispatch(setNickName(nickName));
      localStorage.setItem('nickName', nickName);
      navigate('/');
    } else {
      // 로그인 실패시
      setErrorMessage('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  const moveSignUp = () => {
    navigate('/signup');
  };

  return (
    <>
      <StyledContainer>
        <form onSubmit={loginHandler}>
          <h1>로그인</h1>
          <StyledInput type="email" placeholder="이메일" required />
          <StyledInput type="password" placeholder="비밀번호" required />
          <StyledButton type="submit">로그인</StyledButton>
          <p>계정이 없으신가요? <StyledMove onClick={moveSignUp}>회원가입</StyledMove></p>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      </StyledContainer>
    </>
  );
};

export default SignIn;
