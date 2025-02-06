# ZepPlaylist

![Logo](https://github.com/user-attachments/assets/d860545a-18d7-4768-87ba-08fd8782f56a)

<!-- ![ZepPlaylist-Home](https://github.com/user-attachments/assets/57fd1116-482a-4a0a-968e-31cb89764cb8) -->

<!-- ## 📖 목차

2. [팀원 및 팀소개](#팀원-및-팀소개)
4. [적용 기술 및 기술적 의사결정](#적용-기술-및-기술적-의사결정)
9. [트러블 슈팅](#트러블-슈팅) -->

## 👋 프로젝트 소개

> ### "음악을 들으며 **"나만의**" 플레이리스트를 만들고 자랑해보세요!"

음악을 검색하고 감상하며 플레이리스트를 만들어 볼 수 있는 애플리케이션을 만들어 보면 어떨까 라는 의도에서 만들기 시작했습니다. 플레이리스트를 공유하고 다른 사람들과 소통해보세요!

## 🎉 지금 바로 사용해보기

👉<a href="https://zep-playlist.vercel.app/" target="_blank"> ZepPlaylist💜</a>👈

## 👪 팀원

| <img src="https://cdn-static.zep.us/static/assets/baked-avartar-images/10-320-4-368.png" width="50" height="50"/> | <img src="https://cdn-static.zep.us/static/assets/baked-avartar-images/7-128-1-368.png" width="50" height="50"/> | <img src="https://cdn-static.zep.us/static/assets/baked-avartar-images/7-308-39-368.png" width="50" height="50"/> | <img src="https://cdn-static.zep.us/static/assets/baked-avartar-images/7-104-3-368.png" width="50" height="50"/> | <img src="https://cdn-static.zep.us/static/assets/baked-avartar-images/7-128-20-344.png" width="50" height="50"/> | <img src="https://cdn-static.zep.us/static/assets/baked-avartar-images/10-512-4-368.png" width="50" height="50"/> |
| :---------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: |
|                        **팀장**<br/>주호빈<br/>[@Hobin-joo](https://github.com/Hobin-joo)                         |                          **팀원**<br/>김은지<br/>[@ej-kimm](https://github.com/ej-kimm)                          |                           **팀원**<br/>김지은<br/>[@zzieni](https://github.com/zzieni)                            |                           **팀원**<br/>박준석<br/>[@bj9322](https://github.com/bj9322)                           |                          **팀원**<br/>권현준<br/>[@KHY3260](https://github.com/KHY3260)                           |                     **팀원**<br/>김윤아<br/>[@KimYoona0527](https://github.com/KimYoona0527)                      |

## 📅 개발 기간

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

- 장점: 복잡한 로직을 단순화하여 추후 유지보수가 용이함. 무한 스크롤 지원 및 타입 안정성 제공
- 이유: 리덕스보다 보일러플레이트가 적고, 데이터 패칭과 관련된 기능을 쉽게 구현할 수 있기 때문에 선택됨

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

## 🎯 트러블슈팅 (Trouble Shooting)

### 1️⃣ 여러 곡 재생 시 로딩 속도 문제

#### 1. 문제 상황

- 10곡 이상 재생 시 로딩 속도 10초 이상 발생
- useQueries를 사용하여 모든 곡을 불러온 후 재생 → 최악의 경우 10초 대기

#### 2. 원인 분석

- 미리 듣기 API 부족 → Preview URL을 크롤링하여 해결
- 가사 API는 URL만 제공 → Genius API에서 추가 크롤링 필요
- 각 곡당 2~3초 소요 → 여러 곡 요청 시 대기 시간이 급증

#### 3. 해결 과정

✅ 1차 개선

- 첫 번째 곡만 우선 로딩 → 나머지 곡들은 staleTime, gcTime을 설정하여 캐싱 활용
  이전 곡을 즉시 재생 가능하도록 최적화

✅ 2차 개선

- 가사 크롤링 제거 → lyricsovh API 활용하여 직접 요청
- 불필요한 API 호출 감소

#### 4. 최종 결과

- ✨ 초기 로딩 속도 대폭 개선 (첫 곡만 로딩 후 즉시 재생)
- ✨ 캐싱 활용으로 재생 속도 향상 (반복 재생 시 즉시 플레이)
- ✨ 가사 크롤링 제거로 API 성능 최적화

### 2️⃣ TanStackQuery 라이브러리로 좋아요 상태와 개수 통합관리의 문제점

#### 1. 문제 상황

- 좋아요 상태만 관리할 때는 정상 작동했으나, 좋아요 개수까지 통합 관리 시 오류 발생
- 버튼 클릭 시 콘솔 로그에서 좋아요 개수가 여러 번 변동됨 (예: `0 → 1 → 0`)
- 일부 컴포넌트에서는 **optimistic update 적용된 값(1)**, 다른 곳에서는 **서버에서 재패칭한 값(0)** 이 보여 데이터 불일치 발생

#### 2. 원인 분석

- API 응답 불일치: Supabase에서 `fetchLikeCount` 호출 시 실제 개수와 캐시된 값이 다를 가능성 존재
- 낙관적 업데이트 문제: `onMutate`에서 이전 상태를 한 번만 캡처 후 반전하는 방식 → 연속 클릭 시 최신 상태 반영 실패
- 캐시 키 관리 문제:
  - ['playlist_like', user_id, playlist_id]
  - ['playlist_like_count', playlist_id]
    동일한 query key를 여러 컴포넌트에서 사용하여 한 곳에서 캐시 업데이트 시 다른 컴포넌트와 값 동기화 불일치 발생

#### 3. 해결 과정

✅ API 개선

- `fetchLikeCount` 함수에서 Supabase의 `head: true` 옵션과 `count` 프로퍼티 활용하여 정확한 좋아요 개수 반환

✅ 낙관적 업데이트 로직 개선

- 최신 상태를 반영할 수 있도록 onMutate 내부 로직 수정
- 여러 query key 사용 시 캐시 동기화 방식 최적화

#### 4. 최종 결과

- ✨ 좋아요 개수 동기화 문제 해결 → 캐시 불일치 없이 모든 컴포넌트에서 동일한 값 유지
- ✨ Supabase count 활용하여 정확한 개수 반환
- ✨ 낙관적 업데이트 로직 최적화 → 연속 클릭 시 최신 상태 반영 가능

### 3️⃣ Zustand 상태 초기화 문제 해결: 로컬스토리지에 상태 저장

#### 1. 문제 상황

- Zustand 사용 시 새로고침하면 상태가 초기화되는 현상 발생
- 로컬스토리지나 세션스토리지 등을 사용하지 않아 상태 유지가 되지 않음

#### 2. 원인 분석

- 상태를 로컬스토리지에 저장하지 않고 새로고침이나 페이지 이동 시 상태가 초기화되는 문제 발생

#### 3. 해결 과정

- Zustand에서 제공하는 `persist` 메서드 활용
- `revalidatePath()` 매서드 호출 후 상태 변경 시 자동으로 로컬스토리지에 저장되도록 설정
- persist 메서드로 상태를 로컬스토리지에 쉽게 저장하여 새로고침 후에도 상태를 유지

#### 4. 최종 결과

- ✨ 상태가 로컬스토리지에 저장되어 새로고침 후에도 상태 유지
- ✨ 로그인 정보, 모달 상태 등 로컬스토리지에 자동 저장

#### 5. 배운 점

1. 상태관리의 이해 : Zustand로 상태관리를 하면 새로고침하거나, 페이지 이동시 저절로 상태관리가 남아있어 되는줄 알았는데 유저 스토어에서 user를 호출안해도 로그인상태,로그인정보 등을 로컬스토리지에 저장 하여 상태를 쓸수있음.
2. persist 메서드 활용 : auth 관련 로직을 로컬스토리지에 쉽게 저장하고 상태가 초기화되지 않도록 유지할 수 있음

### 4️⃣ TOP100 차트 전체 재생시 과도한 API 호출과 로딩 시간 문제

#### 1. 문제 상황

- TOP100 차트 전체 재생 기능 동작 시 로딩 시간이 과도하게 길어짐
- 국내/글로벌 TOP100 차트를 serverAction으로 호출 시 간헐적으로 HTTP Error 429 (Too Many Requests) 발생

#### 2. 원인 분석

1. 과도한 API 요청: 전체 재생 기능 실행 시 100개의 spotify_id를 매번 가져와야 하기 때문에 서버에 과도한 요청이 발생하고 재생 로딩 시간이 길어짐
2. 빈번한 차트 데이터 갱신: 1시간마다 변경되는 TOP 차트 데이터를 실시간으로 가져오려 시도로 불필요하게 잦은 API 호출을 유발됨
3. 서버 부하 증가: 사용자의 재생 요청마다 전체 차트 데이터를 새로 불러오는 구조로 서버 리소스를 비효율적으로 사용하게 만듦

#### 3. 해결 과정

✅ GitHub Actions를 활용한 정기적 데이터 갱신

- GitHub Actions를 사용하여 1시간마다 실행되는 스케줄 작업 설정
- 이 작업을 통해 최신 TOP 차트 데이터를 Supabase 테이블에 주기적으로 적재

✅ 캐싱 전략 도입

- Supabase에 저장된 최신 차트 데이터를 활용하여 클라이언트 요청 처리
- 이를 통해 Spotify API에 대한 직접적인 호출 횟수 감소

✅ 요청 최적화

- 전체 재생 기능 실행 시 Supabase에서 캐시된 데이터를 한 번에 가져오도록 구현하여 반복적인 API 호출 제거

#### 4. 최종 결과

## 🔗 ERD

<a href="https://github.com/user-attachments/assets/3fa8cb39-d7a9-4969-aa4b-deec6fb80c9a" target="_blank">
  <img src="https://github.com/user-attachments/assets/3fa8cb39-d7a9-4969-aa4b-deec6fb80c9a" alt="ERD" width="1000">
</a>

## 📁 파일 구조

```
📂 ZEPPLAYLIST/
 ┣ 📂api                    # API 요청 관련 로직
 ┃ ┣ 📂community
 ┃ ┣ 📂home
 ┃ ┣ 📂like-music
 ┃ ┣ 📂music-play
 ┃ ┣ 📂my-page
 ┃ ┣ 📂playlist
 ┃ ┣ 📂playlist-detail
 ┃ ┣ 📂searchSpotifySong
 ┣ 📂app                    # Next.js 'pages' 디렉토리
 ┃ ┣ 📂(auth)               # 인증 관련 페이지들 (로그인, 회원가입)
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┗ 📂sign-up
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┣ 📂(home)               # 메인/홈 페이지 관련 코드(빌보드 탑 100, 국내 탑100, 노래 검색)
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┣ 📂billboardTopChart
 ┃ ┃ ┣ 📂koreaTopChart
 ┃ ┃ ┣ 📂latest-album
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┗ 📂_components
 ┃ ┃ ┣ 📂search
 ┃ ┣ 📂api                  # api 라우트 (Next.js API 라우트 구조)
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂billboardChart
 ┃ ┃ ┗ 📂koreanChart
 ┃ ┣ 📂community            # 커뮤니티 관련 페이지
 ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┣ 📂_components
 ┃ ┣ 📂music-history        # 현재 재생 목록 관련 컴포넌트
 ┃ ┃ ┣ 📂_components
 ┃ ┣ 📂my-page              # 마이 페이지 관련 코드
 ┃ ┃ ┣ 📂_components
 ┃ ┣ 📂playlist             # 플레이리스트 관련 페이지와 컴포넌트
 ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┣ 📂likes
 ┃ ┗ 📜layout.tsx           # 레이아웃 컴포넌트
 ┣ 📂assets                 # 이미지, 폰트, SVG 등 정적 파일
 ┃ ┣ 📂fonts
 ┃ ┗ 📂images
 ┣ 📂components             # 재사용 가능한 컴포넌트 및 뮤직플레이 (하단 재생바)
 ┃ ┣ 📂animation
 ┃ ┣ 📂common
 ┃ ┣ 📂layout
 ┃ ┣ 📂music-play
 ┃ ┗ 📂providers
 ┣ 📂constants              # 상수 관련 코드
 ┣ 📂hooks                  # 커스텀 훅
 ┣ 📂store                  # 상태 관리 관련 코드 (Zustand)
 ┣ 📂styles                 # 전역 스타일 파일
 ┃ ┗ 📜globals.css
 ┣ 📂types                  # TypeScript 타입 지정 파일
 ┣ 📂utils                  # 유틸리티 함수 모음
 ┗ 📜middleware.ts          # 미들웨어 관련 코드
```
