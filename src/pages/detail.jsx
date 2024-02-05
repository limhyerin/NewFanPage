import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setData } from '../redux/modules/data';

// 팬페이지 수정박스 틀
const StyledLetter = styled.div`
  width: 70%;
  background-color: #7988a883;
  margin: 50px auto 50px auto;
  padding-bottom: 50px;
  text-align: center;
  border-radius: 8px;
`;

// 다시 메인페이지로 돌아가는 홈버튼
const StyledHomeBtn = styled.img`
  width: 3%;
  margin: 50px auto 50px auto;
`;

// 해당 팬레터의 프로필
const StyledProfileIMG = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 70%;
    text-align: center;
`; 

// 기존 팬레터 내용
const StyledContent = styled.p`
  width: 500px;
  margin: 10px auto 10px auto;
  border: 3px solid rgba(255, 255, 255, 0.692);
  border-radius: 8px;
  padding: 20px;
`;

// 수정하는 팬레터 박스
const StyledNewcontent = styled.textarea`
  width: 500px;
  height: 70px;
  border: 3px solid rgba(255, 255, 255, 0.692);
  border-radius: 8px;
  padding: 20px;
  background-color: #7988a84e;
`;

// 수정 버튼 css
const StyledEditButton = styled.button`
  background-color: #7e79a8bb;
  border: 3px solid transparent;
  border-radius: 8px;
  padding: 8px 20px;
  color: white;
  margin-left: 2px;
  margin-right: 2px;

  &:hover {
    background-color: #7e79a8;
    border: 3px solid transparent;
  }
`;

// 완료 버튼 css
const StyledSaveButton = styled.button`
  background-color: #5d8660b8;
  border: 3px solid transparent;
  border-radius: 8px;
  padding: 8px 20px;
  color: white;
  margin-left: 2px;
  margin-right: 2px;

  &:hover {
    background-color: #5d8660;
    border: 3px solid transparent;
  }
`;

// 삭제 버튼 css
const StyledDelButton = styled.button`
  background-color: #a87979bc;
  border: 3px solid transparent;
  border-radius: 8px;
  padding: 8px 20px;
  color: white;
  margin-left: 2px;
  margin-right: 2px;

  &:hover {
    background-color: #a87979;
    border: 3px solid transparent;
  }
`;

function Detail() {
  // url에서 id 값 받아오기
  const { id } = useParams();
  const storedData = JSON.parse(localStorage.getItem('data'));
  const item = storedData.find((item) => item.id === id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 글자수 제한
  let [inputCount, setInputCount] = useState(0); 

  // 수정 기능
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(item.contents);

  const editHandler = () => {
    setIsEditing(true);
  }

  const cancelEditHandler = () => {
    setIsEditing(false);
    setEditData(item.contents);
  }

  const saveHandler = () => {
    setIsEditing(false);
    // 수정한 내용 저장
    const updateData = storedData.map((data) => {
      if(data.id === id) {
        return {...data, contents: editData};
      }
      return data;
    });
    // 수정된 데이터 로컬 스토리지에 저장
    localStorage.setItem('data', JSON.stringify(updateData));
    // Redux store 업데이트
    dispatch(setData(updateData));
  }

  const deleteHandler = () => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if(confirmDelete) {
      // 삭제된 데이터 제외하고 저장
      const updateData = storedData.filter((data) => data.id !== id);
      localStorage.setItem('data', JSON.stringify(updateData));
      // Redux store 업데이트
      dispatch(setData(updateData));

      // 삭제 후 홈 페이지로 이동
      navigate(`/`);
    }
  }
  return (
    <div>
      <StyledLetter>
        <Link to="/"><StyledHomeBtn alt="btn" src={`${process.env.PUBLIC_URL}/public_assets/HomeBtn.png`}/></Link>
        <div>
          <StyledProfileIMG alt="profileImg" src={item.profileImg}/>
        </div>
        <div>
          <h3>{item.nickName}</h3>
          <p>To. {item.iswho}</p>
          <p>{item.time}</p>
          {isEditing ? (
            <div>
              <StyledNewcontent
              value={editData}
              onChange={(e) => {
                setEditData(e.target.value)
                setInputCount(e.target.value.length);
              }}
              maxLength={100}
              />
              <p>
                <span>{inputCount}</span>
                <span>/100 자</span>
              </p>
            </div>
          ) : (
            <StyledContent>{item.contents}</StyledContent>
          )}
          {isEditing ? (
            <>
              <StyledSaveButton onClick={saveHandler}>완료</StyledSaveButton>
              <StyledDelButton onClick={cancelEditHandler}>삭제</StyledDelButton>
            </>
          ) : (
            <>
              <StyledEditButton onClick={editHandler}>수정</StyledEditButton>
              <StyledDelButton onClick={deleteHandler}>삭제</StyledDelButton>
            </>
          )}
        </div>
      </StyledLetter>
    </div>
  )
}

export default Detail