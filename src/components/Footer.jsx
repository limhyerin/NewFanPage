import { useState } from "react";

const Footer = ({data}) => {
    const [nickName, setNickName] = useState('');
    const [contents, setContents] = useState('');
    return <footer>
                {
                    data.filter((item) => !item.isDone).map((item) => (
                        <div key={item.id} className="boxContainer">
                            <div className="box">
                                <div>
                                    <p>이미지 들어올 곳</p>
                                </div>
                                <div>
                                    <h3>{item.nickName}</h3>
                                    <p>시간</p>
                                    <p>{item.contents}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </footer>
}

export default Footer



// 왼쪽 사진
// 오른쪽 닉네임, 시간, 내용
// 아래 수정, 삭제 버튼
// 삭제 버튼 클릭시 정말로 삭제 하겠냐는 안내창 띄우기
// 마우스 올리면 hover() 커져보이는
// 클릭시 새 페이지 이동 -> 

// 새 페이지에서 홈으로 돌아가는 버튼 하나,
// 사진, 닉네임, to.누구, 시간, 수정 input창
// 수정완료 버튼
// 클릭시 이대로 수정하시겠습니까? 물어보고 확인 누르면 수정
