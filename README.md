<div align="center">
  <h1>🏫고!길동 - Front</h1>
  <p>EFUB 5기 AWA 길동이팀 "고!길동" 프로젝트 프론트엔드 레포지토리입니다.</p>
  <img width="400" alt="gogildong-preview" src="gogildong/public/logo_horizontal.svg" />
</div>

## 👩‍🦼‍➡️고!길동은 어떤 프로젝트일까요?
> 모두가 같은 길을 걸을 수 있도록
`고!길동`은 이동이 불편한 학생과 보호자를 위해 학교 내부 접근성 데이터를 제공하는 웹 서비스입니다. 시민들의 자발적인 제보로 수집한 초·중·고 및 대학교의 실측 데이터와 현장 사진을 활용하여, 모두에게 차별 없는 교육 환경의 길을 제시합니다.

## 🗓️ 개발 기간
- 2025.10.28 ~ 2025.12.17

## 🎬 서비스 소개 영상

<div align="center">

[![고!길동 서비스 소개 영상](https://img.youtube.com/vi/jPUrGcPT_-8/0.jpg)](https://youtu.be/jPUrGcPT_-8)

▶ 이미지를 클릭하면 YouTube에서 소개 영상을 볼 수 있어요

</div>

## 💡 주요 기능

<div align="center">
  <img width="1920" height="1080" alt="서비스 주요 기능1" src="https://github.com/user-attachments/assets/e80f7ac1-ade7-43ce-a7de-3ac1721397ca" />
<img width="1920" height="1080" alt="서비스 주요 기능2" src="https://github.com/user-attachments/assets/566ede91-3b1d-4a65-8f4c-f6b1b43374de" />
<img width="1920" height="1080" alt="서비스 주요 기능3" src="https://github.com/user-attachments/assets/d7c544a7-7573-461c-88ba-4f3bbd234d8c" />
<img width="1920" height="1080" alt="서비스 주요 기능4" src="https://github.com/user-attachments/assets/c6607a17-96fa-48f8-960c-bfd9016566dc" />

</div>

## 🔧 폴더 구조 
```
gogildong
├─ mkcert                # Local HTTPS certificates
├─ public                # Static assets (logos, icons)
├─ src
│  ├─ Admin              # Admin (Desktop) pages & components
│  ├─ FacilityView       # Facility detail & review view
│  ├─ Gildong            # Gamification (quiz, ranking, shop, character)
│  ├─ Home               # Main home & school search
│  ├─ Login              # Authentication (login)
│  ├─ Mypage             # User profile & settings
│  ├─ Report             # Facility report creation flow
│  ├─ ReportView         # Report & review detail view
│  ├─ School             # School & facility listing
│  ├─ Signup             # User registration flow
│  ├─ common             # Shared components, layout, utils
│  ├─ App.tsx            # App root
│  ├─ router.tsx         # Route definitions
│  └─ main.tsx           # App entry point
├─ .env
├─ package.json
├─ vite.config.ts
└─ README.md
```

## 🔨 기술 스택
**Develop**

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> 

**Deploy**

<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> 

## 👩‍💻 팀원
<table>
  <tr>
    <td align="center"><img src="https://github.com/gimye.png" width="100" /></td>
    <td align="center"><img src="https://github.com/yepot.png" width="100" /></td>
    <td align="center"><img src="https://github.com/oooooming.png" width="100" /></td>
    <td align="center"><img src="https://github.com/topograp2.png" width="100" /></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/yepot"><strong>@otwaylee</strong></a></td>
    <td align="center"><a href="https://github.com/oooooming"><strong>@wys0530</strong></a></td>
    <td align="center"><a href="https://github.com/gimye"><strong>@gimye</strong></a></td>
    <td align="center"><a href="https://github.com/topograp2"><strong>@topograp2</strong></a></td>
  </tr>
  <tr> <td align="center">이아영</td> <td align="center">우윤수</td> <td align="center">김예린</td> <td align="center">홍지형</td> </tr>

<details>
<summary><strong>👀 역할 상세 보기</strong></summary>

### 이아영
- 로그인, 회원가입 페이지 퍼블리싱 및 인증 API 연동
- 제보 플로우 페이지 퍼블리싱 및 API 연동 (사진 촬영, 정보 입력, 제출)
- Webcam 기반 이미지 캡처 및 S3 presigned URL 업로드 구현
- 열람 상세 페이지 퍼블리싱 및 API 연동
- 관리자 학교 리스트 / 제보관리 / 요청관리 페이지 퍼블리싱
- 로컬 HTTPS 개발 환경 구축 (mkcert 적용)

### 우윤수
- 카카오맵(지도, 로드뷰) API 연동
- 홈 페이지 퍼블리싱
- 외부인 정보 열람 신청 페이지 퍼블리싱
- 열람 리뷰, 사진 조회 페이지 퍼블리싱
- 관리자 통계 대시보드, 도면 관리 페이지 퍼블리싱
- 마이페이지 메인(도입) 퍼블리싱

### 김예린
- 학교 로드뷰 렌더링 분기처리 및 로드뷰 객체 생성 로직 수정
- 교내 층 리스트, 층별 시설 리스트 조회 API 연동
- gps 기반 학교 조회, 학교 검색, 학교 정보 상세 조회 API 연동
- 시설 리뷰 CRD, 신고, 요약 ai API 연동
- 시설 리뷰 좋아요/좋아요 취소 API 연동
- 시설 상세 조회, 이미지 조회, 이미지 신고 API 연동

### 홍지형
- 회원정보 조회 API 연동
- 로그아웃 API 연동
- 퀴즈, 상점, 옷장, 랭킹 퍼블리싱
- 코인 API 연동
- 퀴즈 관련 API 연동
- 랭킹(전체, 교내, 학교별) 관련 API 연동
- 옷입히기 API 연동
- 상점 내 아이템 구매 API 연동


</details>



