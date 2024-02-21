import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const signUpHandler = async (e) => {
    e.preventDefault();
    const nickName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const inputValue = {
      nickName,
      email,
      password,
    };

    // 서버로 중복 확인 요청
    const response = await axios.get(`http://localhost:4000/users?nickName=${nickName}&email=${email}`);
    if (response.data.length === 0) {
      // 중복된 값이 없는 경우 회원가입 요청
      const signUpResponse = await axios.post("http://localhost:4000/users", inputValue);
      if (signUpResponse.status === 201) {
        // 회원가입 성공
        navigate('/');
      }
    } else {
      // db.json에 중복된 값이 있는 경우
      setErrorMessage('이미 있는 데이터입니다. 다시 입력해주세요.');
    }
  };

  const moveLogin = () => {
    navigate('/signin');
  };

  return (
    <>
      <StyledContainer>
        <form onSubmit={signUpHandler}>
          <h1>회원가입</h1>
          <StyledInput type="text" placeholder="닉네임" required />
          <StyledInput type="email" placeholder="이메일" required />
          <StyledInput type="password" placeholder="비밀번호" required />
          <StyledButton type="submit">회원가입</StyledButton>
          <p>이미 계정이 있으신가요? <StyledMove onClick={moveLogin}>로그인</StyledMove></p>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      </StyledContainer>
    </>
  );
};

export default SignUp;
