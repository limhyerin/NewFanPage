import InputData from "./InputData";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData, setSelectWho } from "../redux/modules/data";
import uuid from "react-uuid";
import styled from "styled-components"

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
    //border-radius: 8px;
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
    const [nickName, setNickName] = useState('');
    const [contents, setContents] = useState('');
    const [profileImg, setProfileImg] = useState('');

    // 데이터에 접근
    const dispatch = useDispatch();
    const { data, selectWho } = useSelector((state) => ({
        data: state.data,
        selectWho: state.selectWho
    }));

    // 글자수 제한
    let [inputCount, setInputCount] = useState(0); 
    let [contentCount, setContentCount] = useState(0);

    const clickAddHandler = (event) => {
        if(nickName && contents) {
            const newData = {
                id: uuid(),
                nickName: nickName,
                contents: contents,
                profileImg: profileImg || `${process.env.PUBLIC_URL}/public_assets/profile.jpg`,
                time: new Date().toLocaleString(),
                iswho: selectWho,
            }
            // setData([newData,...data]);
            dispatch(setData([newData, ...data]));
            setNickName(''); // 등록 후 닉네임 초기화
            setContents(''); // 등록 후 내용 초기화
            setProfileImg(''); // 등록 후 프로필 url 초기화
        } else {
            alert("닉네임과 내용은 필수 입력값입니다.");
        }
    }

    // 로컬 스토리지 데이터 저장
    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data)); // 객체 모양 그대로 유지
    }, [data]);
    
    return <StyledMain>
                <InputData
                    title={"닉네임"}
                    placeholder={"최대 20글자까지 작성할 수 있습니다"}
                    value={nickName}
                    onChange={(e) => {
                        setNickName(e.target.value);
                        setInputCount(e.target.value.length);
                    }}
                    maxLength={20}
                />
                <StyledCount>
                    <span>{inputCount}</span>
                    <span>/20 자</span>
                </StyledCount>
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