import styled from "styled-components";
import React from "react";

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
    padding-top: 120px;
    height: 130px;
`;

// 로고 크기
const StyledLogoImage = styled.img`
    width: 13%;
`;

const Header = () => {
    return <StyledHeader>
                <StyledLogo>
                    {/* 로고 클릭 시, 새로고침 */}
                    <StyledLogoImage alt="logo" src={`${process.env.PUBLIC_URL}/public_assets/logo.png`} onClick={() => window.location.reload()}/>                    
                </StyledLogo>
            </StyledHeader>
}

export default Header