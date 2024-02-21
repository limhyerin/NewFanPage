import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setData } from "../redux/modules/data";

const StyledFooter = styled.footer`
    width: 50%;
    background-color: rgb(255, 255, 255);
    border: 3px solid transparent;
    border-radius: 8px;
    padding: 20px 20px 20px 20px;
  
    margin: 10px auto 10px auto;
`;

const StyledBox = styled.div`
    background-color: rgba(93, 120, 160, 0.658);
    border: 2px solid transparent;
    margin-bottom: 10px;
    display: flex;
    padding: 10px 10px 10px 10px;
  
    text-decoration: none;
    color: black;
    &:hover {
        background-color: rgba(75, 94, 122, 0.658);
    }
`; 
  
const StyledProfileIMG = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 70%;
    text-align: center;
`; 

const StyledProfileZone = styled.div`
    width: 20%;
    padding-top: 20px;
    padding-left: 20px;
`; 

const StyledContentZone = styled.div`
    width: 75%;
    color: black;
`; 

const StyledEmptyBox = styled.p`
    color: #000000;
    text-align: center;
`;

const Footer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const nickName = localStorage.getItem('nickName');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/posts`
                );
                dispatch(setData(response.data.posts));
                localStorage.setItem('data', JSON.stringify(response.data.posts));
            } catch (err) {
                console.error("Failed to fetch data: ", err);
            }
        };
        fetchData();
    }, [dispatch]);

    // 데이터 가져옴
    const { data, selectBtn, nickName } = useSelector((state) => ({
        data: state.data.data,
        selectBtn: state.data.selectBtn,
        nickName: state.data.nickName
    }));
    
    const filteredData = data ? data.filter((item) => item.iswho === selectBtn) : [];

    return <StyledFooter>
                {
                    filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <div key={item.id} className="boxContainer">
                            <StyledBox onClick={() => {
                                navigate(`/detail/${item.id}`);
                            }}>
                                <StyledProfileZone>
                                    <StyledProfileIMG alt="profileImg" src={item.profileImg}/>  
                                </StyledProfileZone>
                                <StyledContentZone>
                                    <h3>{nickName}</h3>
                                    <p>{item.time}</p>
                                    <p>{item.contents}</p>
                                </StyledContentZone>
                            </StyledBox>
                        </div>
                    ))
                    ) : (
                        <StyledEmptyBox>등록된 글이 없습니다</StyledEmptyBox>
                    )
                }
            </StyledFooter>
}

export default Footer