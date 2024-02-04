# 💫Project : Aespa FanPage💫
![](https://velog.velcdn.com/images/hrnn00/post/27369841-9c76-4363-81ef-b08e92083471/image.png)
<br/>

## 프로젝트 설명
React를 사용하여 useState만을 이용해 상태를 관리해보고 contextAPI와 Redux를 적용하여 다시 바꾸어 적용해보았으며 팬페이지(Fan Page)로 각 멤버를 지정해서 닉네임, 응원의 팬레터 글, 원하는 프로필 사진의 url을 작성한 후 등록하기 버튼을 클릭하면 최근순으로 팬레터가 추가되고 수정 및 삭제가 가능한 페이지입니다.
<br/>

## 브랜치(branch)
- **propsDrilling** : context, redux 없이 useState만으로 상태관리해서 코드 작성
- **context** : react context API 사용하여 전역상태를 이용한 코드로 리팩터링
- **redux** : redux 라이브러리를 이용한 코드로 리팩터링
<br/>

## 구현사항
> ### component

#### 1. Header.jsx
- 배경 이미지 적용
- styled-components 사용해서 css 적용
- 로고 이미지 적용
- 로고 클릭시, 새로고침
: window.location.reload()
![](https://velog.velcdn.com/images/hrnn00/post/4e985003-feef-4877-abb2-372ad4d97569/image.png)
<br/>

#### 2. Member
- styled-components 사용해서 css 적용
- 멤버 이미지에 마우스 올리면 hover 효과 적용
- 해당 그룹 멤버들 사진 적용
- 각 멤버 사진 클릭시, 해당 멤버의 팬레터만 보여지도록 설정
![](https://velog.velcdn.com/images/hrnn00/post/ac77add0-a4e3-4e82-bbaf-4010348b432b/image.png)
<br/>

#### 3. Main
- 닉네임, 프로필사진 url, 팬레터 보낼 멤버 클릭, 내용 구현
- select-box 구현 : 윈터, 카리나, 닝닝, 지젤 중에 선택
- 글자수 카운트 구현 : 닉네임과 내용 따로 state를 만들어서 관리
- 등록시에 로컬스토리지에 객체형태로 값 저장<br/>
![](https://velog.velcdn.com/images/hrnn00/post/56c18aaf-6924-4ec7-80a3-749c853d2aba/image.png)
<br/>

#### 4. Footer
- 좌측 : 프로필 사진 url을 받아 css를 주어 동그란 프로필 이미지로 적용
- 우측 : 닉네임, 등록 시간, 내용 적용
- Main 컴포넌트에서 입력받아 로컬스토리지에 저장한 값을 불러옴
- 등록한 시간 적용 : new Date().toLocaleString()
- 각 레터 마우스 올릴 시, hover 효과 적용
![](https://velog.velcdn.com/images/hrnn00/post/de37c0dc-7cde-457c-b8d0-f62efe367b55/image.png)
<br/>

#### 5. InputData
- Main 컴포넌트에서 반복되는 입력을 재사용하기 위한 컴포넌트

> ### page

#### 6. detail.jsx
![](https://velog.velcdn.com/images/hrnn00/post/4d3adc7e-a0fb-455e-ae2d-4cfd4d994bca/image.png)
- 홈버튼 : 메인 페이지로 돌아가는 버튼
- 프로필 이미지, 닉네임, 팬레터 대상 정보, 등록시간, 팬레터 내용, 수정 및 삭제 버튼 구현
- 수정 버튼 클릭 시 수정 가능한 입력창 구현
- 완료 버튼 시 변경내용 적용
![](https://velog.velcdn.com/images/hrnn00/post/24824bf9-68ca-4183-85ba-9e27aecd0781/image.png)
- 삭제버튼 클릭시 유효성 검사 <br/>
![](https://velog.velcdn.com/images/hrnn00/post/720c5fe2-5842-4ffc-9297-36a074aa4da0/image.png)
<br/>

> ### router

#### 7. Router.js
- Router.js : App 컴포넌트에서 detail 페이지로 넘어갈때 id값 넘겨주기
```jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Detail from "./pages/detail";

const RouterConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
};

export default RouterConfig;

```
