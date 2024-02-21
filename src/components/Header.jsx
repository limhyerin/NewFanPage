import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// 헤더 배경이미지 설정
const StyledHeader = styled.header`
    background-image: url("${process.env.PUBLIC_URL}/public_assets/backgroundIMG.png");
    background-position: center;
    background-size: cover;
    height: 250px;
`;

// 로고 위치 구역
const StyledLogo = styled.div`
    text-align: center;
    padding-top: 90px;
    height: 130px;
`;

// 로고 크기
const StyledLogoImage = styled.img`
    width: 13%;
`;

const StyledBtnBox = styled.div`
    width: 230px;
    float: right;
    display: flex;
    margin-right: 20px;
`;

const StyledBtnSignin = styled.button`
    background-color: #638cca;
    width: 100px;
    padding: 5px 10px 5px 10px;
    margin-left: 5px;
    margin-top: 5px;

    border-radius: 10px;
    border-color: transparent;
`;

const StyledBtnSignup = styled.button`
    background-color: #ffffff;
    width: 100px;
    padding: 5px 10px 5px 10px;
    margin-left: 5px;
    margin-top: 5px;

    border-radius: 10px;
    border-color: transparent;
`;

const StyledWelcome = styled.p`
    width: 80px;
    height: 30px;
    padding: 5px 10px 5px 10px;
    margin-left: 5px;
    margin-top: 5px;
    color: white;
    font-size: 20px;
`;

const StyledBtnSignout = styled.button`
    background-color: #638cca;
    width: 100px;
    height: 40px;
    padding: 5px 10px 5px 10px;
    margin-left: 5px;
    margin-top: 5px;

    border-radius: 10px;
    border-color: transparent;
`;

const Header = () => {
    const navigate = useNavigate();
    const { nickName } = useSelector((state) => state.data);

    const handleLogout = () => {
        // Clear authentication status and remove nickname from local storage
        localStorage.removeItem('nickName');
        navigate('/signin');
    };
    return <StyledHeader>
                <StyledBtnBox>
                    {nickName ? (
                        <>
                            <StyledWelcome><strong>{nickName}</strong>님</StyledWelcome>
                            <StyledBtnSignout onClick={handleLogout}><strong>Logout</strong></StyledBtnSignout>
                        </>
                    ) : (
                        <>
                            <StyledBtnSignin onClick={() => navigate('/signin')}><strong>SignIn</strong></StyledBtnSignin>
                            <StyledBtnSignup onClick={() => navigate('/signup')}><strong>SignUp</strong></StyledBtnSignup>
                        </>
                    )}
                </StyledBtnBox>
                <StyledLogo>
                    {/* 로고 클릭 시, 새로고침 */}
                    <StyledLogoImage alt="logo" src={`${process.env.PUBLIC_URL}/public_assets/logo.png`} onClick={() => window.location.reload()}/>                    
                </StyledLogo>
            </StyledHeader>
}

export default Header