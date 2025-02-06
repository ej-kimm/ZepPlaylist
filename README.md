# ZepPlaylist

![Logo](https://github.com/user-attachments/assets/d860545a-18d7-4768-87ba-08fd8782f56a)

<!-- ![ZepPlaylist-Home](https://github.com/user-attachments/assets/57fd1116-482a-4a0a-968e-31cb89764cb8) -->

<!-- ## 📖 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [팀원 및 팀소개](#팀원-및-팀소개)
3. [주요기능](#주요기능)
4. [적용 기술 및 기술적 의사결정](#적용-기술-및-기술적-의사결정)
5. [개발기간](#개발기간)
6. [기술스택](#기술스택)
7. [ERD](#ERD)
8. [프로젝트 파일 구조](#프로젝트-파일-구조)
9. [트러블 슈팅](#트러블-슈팅) -->

## 👋 프로젝트 소개

> ### "음악을 들으며 **"나만의**" 플레이리스트를 만들고 자랑해보세요!"

음악을 검색하고 감상하며 플레이리스트를 만들어 볼 수 있는 애플리케이션을 만들어 보면 어떨까 라는 의도에서 만들기 시작했습니다. 플레이리스트를 공유하고 다른 사람들과 소통해보세요!

## 👪 팀원

| <img src="https://cdn-static.zep.us/static/assets/baked-avartar-images/10-320-4-368.png" width="50" height="50"/> | <img src="https://cdn-static.zep.us/static/assets/baked-avartar-images/7-128-1-368.png" width="50" height="50"/> | <img src="https://cdn-static.zep.us/static/assets/baked-avartar-images/7-308-39-368.png" width="50" height="50"/> | <img src="https://cdn-static.zep.us/static/assets/baked-avartar-images/7-104-3-368.png" width="50" height="50"/> | <img src="https://cdn-static.zep.us/static/assets/baked-avartar-images/7-128-20-344.png" width="50" height="50"/> | <img src="https://cdn-static.zep.us/static/assets/baked-avartar-images/10-512-4-368.png" width="50" height="50"/> |
| :---------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: |
|                        **팀장**<br/>주호빈<br/>[@Hobin-joo](https://github.com/Hobin-joo)                         |                          **팀원**<br/>김은지<br/>[@ej-kimm](https://github.com/ej-kimm)                          |                           **팀원**<br/>김지은<br/>[@zzieni](https://github.com/zzieni)                            |                           **팀원**<br/>박준석<br/>[@bj9322](https://github.com/bj9322)                           |                          **팀원**<br/>권현준<br/>[@KHY3260](https://github.com/KHY3260)                           |                     **팀원**<br/>김윤아<br/>[@KimYoona0527](https://github.com/KimYoona0527)                      |

## 📅🕒 개발 기간

2024.12.31 ~ 2025.02.06

## 🚀 기술 스택

<!-- TODO : 사진 넣어야함 기술스택 사용한것들 -->
<!-- ## 적용 기술 및 기술적 의사결정

![Tech](https://github.com/user-attachments/assets/757c5f15-0350-41bb-9719-ac0efd40d304) -->

#### 📌 프레임워크 & 언어

<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=Supabase&logoColor=white"/>
<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=white"/>

#### 📚 주요 라이브러리

<img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat-square&logo=reactQuery&logoColor=white"/>
<img src="https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=Zod&logoColor=white"/>
<img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white"/>
<img src="https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=Swiper&logoColor=white"/>

#### ⚒️ 협업 & 관리 툴

<img src="https://img.shields.io/badge/Github-181717?style=flat-square&logo=Github&logoColor=white"/>
<img src="https://img.shields.io/badge/Jira-0052CC?style=flat-square&logo=Jira&logoColor=white"/>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white"/>

#### 🌐 배포

<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white"/>

## 🤔 기술적 의사결정

**👍🏻 Supabase**

- 장점: 파이어베이스보다 빠른 응답속도, 제공되는 프로바이더 기능(소셜 로그인)으로 간편한 구현 가능
- 이유: Firebase보다 API 요청 수 제한이 없으며, Spotify 로그인 기능을 쉽게 구현할 수 있음. 서버 사이드 처리가 잘 되어 있어 유지보수 및 확장성이 용이함

**👍🏻 Zustand**

- 장점: Redux보다 가벼운 상태 관리 라이브러리로, 간단하고 직관적인 코드 작성 가능
- 이유: 서버 상태 관리는 React Query로 관리되므로, 간단한 상태 관리 라이브러리인 Zustand를 선택

**👍🏻 React Query**

- 장점: 복잡한 로직을 단순화하여 추후 유지보수가 용이함.무한 스크롤 지원 및 타입 안정성 제공
- 이유: 리덕스보다 보일러플레이트가 적고, 데이터 패칭과 관련된 기능을 쉽게 구현할 수 있기 때문에 선택됨

<!-- - TypeScript 지원 타입 안정성을 제공하여 개발 과정에서 발생할 수 있는 오류를 사전에 방지?? -->

**👍🏻 Tailwind css**

- 장점: 유틸리티 퍼스트 CSS 프레임워크로, 클래스 충돌 문제를 방지하고 다양한 화면 크기에 대응 가능, **tailwind.config.js** 파일에서 디자인 시스템에 맞는 유틸리티 클래스를 정의 하여 일관된 스타일 적용 가능
- 이유: 스타일의 일관성을 유지할 수 있고, clsx를 활용하여 모바일환경, 데스크탑 환경에 대한 조건부 클래스를 적용하여 코드의 가독성을 높일 수 있음

**👍🏻 React Hook Form + zod**

- 장점: 비제어 컴포넌트의 장점을 살리면서 실시간 유효성 검사와 API 동기화를 가능하게 함
- 이유: 폼 관리가 쉬우며 코드 가독성과 유지보수성을 높이기 위해 선택됨

**👍🏻 Jira**

- 장점: GitHub과 연동하여 스크럼, 칸반 방식으로 프로젝트 관리가 용이하며, 백로그와 프로젝트 계획 및 추적 관리하기 편함
- 이유: 로드맵을 통해 진행상황을 시각적으로 확인할 수 있으며, 팀과의 협업을 쉽게 할 수 있도록 지원함.

## ✅ 주요 기능

## 🔐 회원 및 계정 관리

#### ✍️ 회원가입

- 이메일, 패스워드, 닉네임을 입력하여 간편하게 계정을 생성할 수 있습니다

#### 🔑 로그인

- Supabase Auth를 활용한 소셜 로그인(구글, 카카오, 스포티파이) 및 기존에 가입한 이메일과 비밀번호로 안전하게 로그인 가능합니다

#### 👤 마이페이지

- 프로필 사진, 닉네임, 비밀번호 변경이 가능합니다
- 내가 만든 플레이리스트 확인 (무한 스크롤 지원) 할 수 있습니다
- 좋아요한 플레이리스트 상태 확인 및 좋아요 토글 기능을 추가했습니다

## 🏠 홈 페이지

#### 🔍 스포티파이 API를 활용한 음악 검색

- 스포티파이 API를 활용하여 원하는 음악을 검색할 수 있습니다
- 검색된 장소의 곡제목, 아티스트명, 앨범커버 등 음악 정보를 제공합니다
- 음악 재생 기능을 지원하여 원하는 음악을 재생 할 수 있습니다
- 플레이리스트 담기 기능을 지원하여 원하는 음악을 내가 만든 플레이리스트에 담을 수 있습니다

#### 💿 최신 앨범 제공 (Spotify API 활용)

- 스포티파이 API를 활용하여 최신 발매 앨범을 제공합니다
- 음악 전체 재생 기능을 지원하여 음악을 전체 재생 할 수 있습니다
- 플레이리스트 담기 기능을 지원하여 원하는 음악을 내가 만든 플레이리스트에 담을 수 있습니다

#### 📈 국내 / 빌보드 TOP100 차트

- 국내차트 API를 활용하여 실시간 국내 TOP100 차트를 제공합니다
- 빌보드 라이브러리를 활용하여 실시간 빌보드 TOP100 차트를 제공합니다
- 음악 전체 재생 기능을 지원하여 음악을 전체 재생 할 수 있습니다
- 플레이리스트 담기 기능을 지원하여 원하는 음악을 내가 만든 플레이리스트에 담을 수 있습니다

## 🎼 플레이리스트 기능

#### 🎶 플레이 리스트 페이지

- 플레이리스트 생성, 수정, 삭제 기능 제공 합니다
- 웹에서는 내가 만든 플레이리스트 카드에서 좋아요 토글을 통해 좋아요 카운트를 할 수 있습니다

#### 🔀 플레이리스트 디테일 페이지

- 플레이리스트에 담긴 곡 리스트를 보여줍니다
- 전체 재생 / 랜덤 재생 / 특정 곡 재생 가능합니다
- 리스트 내 곡 삭제 기능을 제공합니다

#### ❤️ 좋아요를 누른 음악 리스트 페이지

- 사용자가 좋아요를 누른 곡 리스트를 보여줍니다
- 전체 재생 / 랜덤 재생 / 특정 곡 재생 가능합니다
- 리스트 내 곡 삭제 기능을 제공합니다

## 🏆 커뮤니티 페이지

#### 🎶 플레이리스트 모아보기

- 공개 설정이 활성화된 플레이리스트 중 1곡 이상 담긴 플레이리스트 조회 가능합니다

#### 🔥 인기 플레이리스트

- 좋아요 개수가 많은 상위 10개 플레이리스트를 보여줍니다

#### 👍 플레이리스트 좋아요

- 다른 사용자의 플레이리스트를 감상하고 좋아요를 누를 수 있습니다

#### 💬 댓글 기능

- 상세 페이지에서 플레이리스트에 대한 댓글을 작성할 수 있습니다

#### 🔍 키워드 필터링

- 카테고리별 플레이리스트 필터링을 지원합니다

#### ➕ 노래 담기 및 플레이리스트 생성

- 커뮤니티 페이지에서도 노래 담기와 플레이리스트를 생성할 수 있습니다

<!-- ## 적용 기술 및 기술적 의사결정

![Tech](https://github.com/user-attachments/assets/757c5f15-0350-41bb-9719-ac0efd40d304)

### 소셜 로그인

Google OAuth를 활용하여 사용자에게 간단하고 안전한 로그인 기능을 제공합니다.
이메일 기반 회원가입 및 로그인 외에도 Google 계정을 통해 빠르게 인증할 수 있습니다. Supabase의 보안 정책을 적용해 데이터는 안전하게 처리됩니다.

### Tanstack & Zustand 상태 관리

React 상태 관리를 위해 Tanstack Query와 Zustand를 도입했습니다.
Tanstack Query로 서버 데이터의 효율적인 캐싱과 데이터 패칭을 처리하며,
Zustand를 통해 전역 상태를 간결하게 관리하여 코드의 가독성과 유지보수성을 높였습니다.

### 카카오맵 API 아웃소싱

카카오맵 API를 활용해 스터디 공간 검색 및 지도 기반 탐색 기능을 구현했습니다.
현재 위치 기반 추천과 장소 검색 필터를 통해 사용자가 쉽게 공간을 찾을 수 있습니다.
지도 API와 연동된 상세 정보를 제공하여 사용자 경험을 향상시켰습니다.

### Supabase DB 관리

Supabase를 데이터베이스 및 인증 관리로 사용해 프로젝트의 백엔드를 간소화했습니다.
유저 정보 저장, 북마크 CRUD, 소셜 로그인 등 주요 데이터 관리에 활용됩니다.
Supabase의 강력한 보안 정책으로 데이터를 안전하게 보호하고 효율적으로 관리합니다. -->

## ERD

![ERD](https://github.com/user-attachments/assets/744a471e-78a3-4bb5-9bdf-7d28875d4108)

## 파일 구조

```
📦src
 ┣ 📂api
 ┃ ┣ 📂community
 ┃ ┃ ┣ 📜actions.ts
 ┃ ┃ ┗ 📜communityDetail.ts
 ┃ ┣ 📂home
 ┃ ┃ ┗ 📜actions.ts
 ┃ ┣ 📂like-music
 ┃ ┃ ┗ 📜actions.ts
 ┃ ┣ 📂music-play
 ┃ ┃ ┣ 📜actions.ts
 ┃ ┃ ┣ 📜genius-api.ts
 ┃ ┃ ┣ 📜lyrics-api.ts
 ┃ ┃ ┗ 📜spotify-api.ts
 ┃ ┣ 📂my-page
 ┃ ┃ ┗ 📜actions.ts
 ┃ ┣ 📂playlist
 ┃ ┃ ┗ 📜actions.ts
 ┃ ┣ 📂playlist-detail
 ┃ ┃ ┗ 📜actions.ts
 ┃ ┣ 📂searchSpotifySong
 ┃ ┗ 📜spotifyToken.ts
 ┣ 📂app
 ┃ ┣ 📂(auth)
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┣ 📜LoginForm.tsx
 ┃ ┃ ┃ ┃ ┣ 📜SocialButton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜SocialButtonItem.tsx
 ┃ ┃ ┃ ┃ ┗ 📜SocialForm.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📂sign-up
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┣ 📜Service.tsx
 ┃ ┃ ┃ ┃ ┗ 📜SignupForm.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂(home)
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┣ 📜Charts.tsx
 ┃ ┃ ┃ ┣ 📜LatestAlbumItmes.tsx
 ┃ ┃ ┃ ┣ 📜LatestAlbums.tsx
 ┃ ┃ ┃ ┣ 📜LikeSongItem.tsx
 ┃ ┃ ┃ ┣ 📜MusicChartHeader.tsx
 ┃ ┃ ┃ ┣ 📜PopularPlayList.tsx
 ┃ ┃ ┃ ┣ 📜SearchBar.tsx
 ┃ ┃ ┃ ┣ 📜SearchHistoryPlaylist.tsx
 ┃ ┃ ┃ ┣ 📜SearchKeywordCarousel.tsx
 ┃ ┃ ┃ ┣ 📜SearchResult.tsx
 ┃ ┃ ┃ ┣ 📜SearchResultItem.tsx
 ┃ ┃ ┃ ┣ 📜Top100ChartDesktopHeader.tsx
 ┃ ┃ ┃ ┣ 📜Top100ChartList.tsx
 ┃ ┃ ┃ ┣ 📜Top100ChartListDesktop.tsx
 ┃ ┃ ┃ ┣ 📜Top100ChartListUI.tsx
 ┃ ┃ ┃ ┣ 📜Top20Item.tsx
 ┃ ┃ ┃ ┣ 📜Top20List.tsx
 ┃ ┃ ┃ ┗ 📜UserLikedSong.tsx
 ┃ ┃ ┣ 📂billboardTopChart
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂koreaTopChart
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂latest-album
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📂components
 ┃ ┃ ┃ ┃ ┣ 📜LatestAlbumDetail.tsx
 ┃ ┃ ┃ ┃ ┣ 📜LatestAlbumDetailDesktop.tsx
 ┃ ┃ ┃ ┃ ┗ 📜LatestAlbumDetailUI.tsx
 ┃ ┃ ┣ 📂search
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📜.DS_Store
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂billboardChart
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┗ 📂koreanChart
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂community
 ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┣ 📜loding.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┣ 📜ClientPopularPlaylistUI.tsx
 ┃ ┃ ┃ ┣ 📜CommentSection.tsx
 ┃ ┃ ┃ ┣ 📜CommunityDetailSkeleton.tsx
 ┃ ┃ ┃ ┣ 📜CommunityDetailUI.tsx
 ┃ ┃ ┃ ┣ 📜CustomSwiper.tsx
 ┃ ┃ ┃ ┣ 📜FloatingPlusButton.tsx
 ┃ ┃ ┃ ┣ 📜KeywordCarouselWrapper.tsx
 ┃ ┃ ┃ ┣ 📜PlaylistCard.tsx
 ┃ ┃ ┃ ┣ 📜PlaylistSection.tsx
 ┃ ┃ ┃ ┗ 📜PopularPlaylistUI.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂music-history
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂my-page
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂playlist
 ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┣ 📂likes
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┗ 📜layout.tsx
 ┣ 📂assets
 ┃ ┣ 📂fonts
 ┃ ┗ 📂images
 ┣ 📂components
 ┃ ┣ 📂animation
 ┃ ┣ 📂common
 ┃ ┣ 📂layout
 ┃ ┣ 📂music-play
 ┃ ┗ 📂providers
 ┣ 📂constants
 ┣ 📂hooks
 ┣ 📂store
 ┣ 📂styles
 ┃ ┗ 📜globals.css
 ┣ 📂types
 ┣ 📂utils
 ┗ 📜middleware.ts
```
