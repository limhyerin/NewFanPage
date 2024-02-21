import InputData from "./InputData";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData, setSelectWho } from "../redux/modules/data";
import uuid from "react-uuid";
import styled from "styled-components"
import axios from 'axios';

const StyledMain = styled.main`
    width: 30%;
    height: 500px;

    margin: 10px auto 10px auto;
    background-color: rgb(255, 255, 255);
    border: 3px solid transparent;
    border-radius: 8px;
  
    padding: 20px auto 20px auto;
    padding-left: 20px;
`;
const StyledContentInput = styled.textarea`
    width: 90%;
    height: 60px;
    background-color: rgba(189, 189, 189, 0.425);
    border: 3px solid transparent;
`;

const StyledCount = styled.p`
    width: 80px;
    margin-left: 75%;
    margin-top: 0px;
    color: #000000;
`;

const StyledRegist = styled.main`
    width: 150px;
    height: 30px;
    text-align: center;
    margin: 10px auto 10px auto;
    font-size: large;
    border: 3px solid transparent;
    border-radius: 8px;
    background-color:rgba(93, 120, 160, 0.658);
    &:hover {
        background-color: rgba(82, 99, 126, 0.658);
    }
`;

const Main = () => {
    const [contents, setContents] = useState('');
    const [profileImg, setProfileImg] = useState('');

    // 글자수 제한
    let [contentCount, setContentCount] = useState(0);

    // 데이터에 가져오기
    const dispatch = useDispatch();
    const { data, selectWho, nickName } = useSelector((state) => ({
        data: state.data.data,
        selectWho: state.data.selectWho,
        nickName: state.data.nickName
    }));

    const postData = async (newData) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/posts`, newData);
            return response.data;
        } catch (err) {
            console.error("Failed to post data: ", err);
        }
    }

    // 로컬 스토리지 데이터 저장
    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
    }, [data]);

    useEffect(() => {
        localStorage.setItem('nickName', nickName);
    }, [nickName]);

    const clickAddHandler = async () => {
        if(contents) {
            const newData = {
                id: uuid(),
                nickName: nickName,
                contents: contents,
                profileImg: profileImg || `${process.env.PUBLIC_URL}/public_assets/profile.jpg`,
                time: new Date().toLocaleString(),
                iswho: selectWho,
            }
            const postedData = await postData(newData);
            dispatch(setData([postedData, ...(data || [])]));
            setProfileImg(''); // 등록 후 프로필 url 초기화
            setContents(''); // 등록 후 내용 초기화
        } else {
            alert("내용은 필수 입력값입니다.");
        }
    }
    
    return <StyledMain>
                <InputData
                    title={"프로필 사진"}
                    placeholder={"프로필 이미지 url 작성"}
                    value={profileImg}
                    onChange={(e) => {
                        setProfileImg(e.target.value);
                    }}
                />
                <div className="whoSend">
                    <p><strong>누구에게 보내실건가요?</strong> &nbsp;
                    <select name="choice" value={selectWho} onChange={(e) => {
                        dispatch(setSelectWho(e.target.value));
                    }}>
                        <option value="winter">윈터</option>
                        <option value="karina">카리나</option>
                        <option value="ningning">닝닝</option>
                        <option value="giselle">지젤</option>
                    </select>
                    </p>
                </div>
                <p><strong>내용</strong></p>
                <StyledContentInput type="text" 
                    placeholder="최대 100글자까지 작성할 수 있습니다"
                    value={contents}
                    onChange={(e) => {
                        setContents(e.target.value);
                        setContentCount(e.target.value.length);
                    }}
                    maxLength={100}
                />
                <StyledCount>
                    <span>{contentCount}</span>
                    <span>/100 자</span>
                </StyledCount>
                <StyledRegist onClick={clickAddHandler}><strong>등록하기</strong></StyledRegist>
            </StyledMain>
}

export default Main