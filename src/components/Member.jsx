import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { setSelectBtn } from "../redux/modules/data";

const StyledMemberClickButtons = styled.div`
    display: flex;
    width: 590px;
    height: 50%;
    margin: 10px auto 30px auto;
    padding: 10px 10px 10px 10px;
    background-color: #ffffff37;
    border-radius: 8px;
`;

// 각 멤버들 이미지 css 및 hover
const StyledMember = styled.img`
    width: 130px;
    height: 180px;
    margin-right: 5%;
    border-radius: 8px;
    border: 3px solid rgba(209, 195, 236, 0.26);
    -webkit-filter: grayscale(100%);
	filter: grayscale(100%);

    -webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: .1s ease-in-out;
	transition: .1s ease-in-out;

    &:hover {
        -webkit-filter: grayscale(0);
	    filter: grayscale(0);

        -webkit-transform: scale(1.05);
	    transform: scale(1.05);
        border: 3px solid rgb(172, 160, 196);
    }

    ${props => props.isSelected && css`
        -webkit-filter: grayscale(0);
	    filter: grayscale(0);

        -webkit-transform: scale(1.05);
	    transform: scale(1.05);
        border: 3px solid rgb(172, 160, 196);
    `}
`;

const Member = () => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(null);

    return <StyledMemberClickButtons>
                <StyledMember alt="winter profile" 
                              src={`${process.env.PUBLIC_URL}/public_assets/winter.jpg`} 
                              onClick={() => {
                                  dispatch(setSelectBtn('winter'));
                                  setSelected('winter');
                              }} 
                              isSelected={selected === 'winter'}
                ></StyledMember>
                <StyledMember alt="karina profile" 
                              src={`${process.env.PUBLIC_URL}/public_assets/karina.jpeg`} 
                              onClick={() => {
                                  dispatch(setSelectBtn('karina'));
                                  setSelected('karina');
                              }} 
                              isSelected={selected === 'karina'}
                ></StyledMember>
                <StyledMember alt="ningning profile" 
                              src={`${process.env.PUBLIC_URL}/public_assets/ningning.png`} 
                              onClick={() => {
                                  dispatch(setSelectBtn('ningning'));
                                  setSelected('ningning');
                              }} 
                              isSelected={selected === 'ningning'}
                ></StyledMember>
                <StyledMember alt="giselle profile" 
                              src={`${process.env.PUBLIC_URL}/public_assets/giselle.jpeg`} 
                              onClick={() => {
                                  dispatch(setSelectBtn('giselle'));
                                  setSelected('giselle');
                              }} 
                              isSelected={selected === 'giselle'}
                ></StyledMember>
            </StyledMemberClickButtons>
}

export default Member
