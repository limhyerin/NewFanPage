# 💫Project : Aespa FanPage💫

![image](https://github.com/limhyerin/NewFanPage/assets/70150896/70e1c2e1-4162-4c39-94bd-79857e1808cf)

<br/>

## 프로젝트 설명

React를 사용하여 useState만을 이용해 상태를 관리해보고 contextAPI와 Redux를 적용하여 다시 바꾸어 적용해보았으며 팬페이지(Fan Page)로 각 멤버를 지정해서 닉네임, 응원의 팬레터 글, 원하는 프로필 사진의 url을 작성한 후 등록하기 버튼을 클릭하면 최근순으로 팬레터가 추가되고 수정 및 삭제가 가능한 페이지
<br/>

## 브랜치(branch)

- **redux-thunk** : 회원가입, 로그인 페이지 구현 및 redux를 redux-toolkit을 사용하여 구현하고 기존에 로컬스토리지에 데이터를 저장해서 가져오고 수정, 삭제했던 기능을 db.json을 통해 관리하고 사용할 수 있도록 변경 
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
+ signin 버튼 : 클릭 시, 로그인 페이지로 이동
+ signup 버튼 : 클릭 시, 회원가입 페이지로 이동
![image](https://github.com/limhyerin/NewFanPage/assets/70150896/7190d5b9-4a4b-467c-a5a2-5b71984c5a5e)

+ 로그인, 회원가입페이지에서 로그인 성공시, 현재 로그인한 계정의 nickName과 Logout 기능 구현
![image](https://github.com/limhyerin/NewFanPage/assets/70150896/35ea4632-10ab-4728-b862-43da2b9caa4d)

  <br/>

#### 2. Member

- styled-components 사용해서 css 적용
- 멤버 이미지에 마우스 올리면 hover 효과 적용
- 해당 그룹 멤버들 사진 적용
- 각 멤버 사진 클릭시, 해당 멤버의 팬레터만 보여지도록 설정
  ![](https://velog.velcdn.com/images/hrnn00/post/ac77add0-a4e3-4e82-bbaf-4010348b432b/image.png)
+ 각 멤버 이미지 클릭 시 클릭되었음을 보여주는 효과 적용
![image](https://github.com/limhyerin/NewFanPage/assets/70150896/3afb0cfe-8e66-4257-8618-a76c73d31c2e)

  <br/>

#### 3. Main
- 닉네임값은 현재 로그인한 계정의 nickName 값 가져오기
- 프로필사진 url, 팬레터 보낼 멤버 클릭, 내용 구현
- select-box 구현 : 윈터, 카리나, 닝닝, 지젤 중에 선택
- 글자수 카운트 구현 : 닉네임과 내용 따로 state를 만들어서 관리
- 등록시에 로컬스토리지에 객체형태로 값 저장했던 부분 db.json으로 저장하고 관리 <br/>
![image](https://github.com/limhyerin/NewFanPage/assets/70150896/ba71bc18-6789-4c90-881d-69a03c91774f)


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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Detail from "./pages/detail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterConfig;

```
