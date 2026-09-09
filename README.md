# 여행자의 방

제주 여행자를 위한 게스트하우스 탐색 플랫폼

## 주요 기능

- **간편하게 시작하기**: 이메일이나 구글·카카오 소셜 계정으로 빠르게 시작할 수 있습니다. 비밀번호 찾기와 재설정을 지원합니다.
- **조건에 맞는 게스트하우스 찾기**: 키워드, 인원, 지역, 가격, 편의시설을 기준으로 원하는 숙소를 찾고 무한 스크롤로 편하게 둘러볼 수 있습니다.
- **지도로 살펴보기**: 네이버 지도와 목록을 함께 보며 숙소의 위치를 확인할 수 있습니다. 모바일에서는 목록과 지도를 자유롭게 전환할 수 있습니다.
- **게스트하우스 정보 확인하기**: 게스트하우스의 이미지, 이용 안내, 객실, 위치, 리뷰를 확인하고, 링크나 카카오톡으로 공유할 수 있습니다.
- **사진과 함께 리뷰 남기기**: 이미지를 첨부한 리뷰를 작성·수정·삭제하고, 다른 여행자의 리뷰를 페이지별로 살펴볼 수 있습니다.
- **마음에 드는 게스트하우스 찜하기**: 마음에 드는 숙소를 저장해두고 나중에 다시 찾아볼 수 있습니다.
- **내 정보와 리뷰 관리하기**: 닉네임과 프로필 이미지를 수정하고, 내가 작성한 리뷰를 모아볼 수 있습니다.

## 기술 스택

| 구분       | 기술                               |
| ---------- | ---------------------------------- |
| 언어       | TypeScript 5                       |
| 프레임워크 | Next.js 16 (App Router), React 19  |
| 스타일링   | Tailwind CSS 4, shadcn/ui          |
| 상태 관리  | Zustand 5, TanStack Query 5        |
| 폼         | React Hook Form 7, Zod 4           |
| 백엔드     | Supabase (Postgres, Auth, Storage) |
| 외부 API   | 네이버 지도 API, 카카오 공유 API   |

## 아키텍처

[Feature-Sliced Design](https://feature-sliced.design/)을 응용한 레이어 구조를 사용합니다.

```
├ app/          # Next.js App Router (실제 구현은 `src/views`에 위치)
└ src/
　 ├─ app/      # 전역 프로바이더
　 ├─ views/    # 페이지 단위 UI
　 ├─ widgets/  # 여러 feature와 entity를 조합한 독립 UI 블록
　 ├─ features/ # 사용자 인터랙션 단위 기능 (인증, 검색, 찜 등)
　 ├─ entities/ # 도메인 모델과 조회 로직 (게스트하우스, 리뷰, 프로필 등)
　 └─ shared/   # 공통 UI 컴포넌트, API 클라이언트, 유틸, 설정
```

각 레이어는 `index.ts`를 통해 공개 API만 노출하며, 상위 레이어는 하위 레이어만 참조할 수 있습니다.

## 시작하기

먼저 `.env.example`을 참고하여 `.env.local` 파일을 생성합니다.

### 환경변수 목록

| 변수명                               | 설명                          |
| ------------------------------------ | ----------------------------- |
| NEXT_PUBLIC_SUPABASE_URL             | Supabase 프로젝트 URL         |
| NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY | Supabase Publishable Key      |
| NEXT_PUBLIC_SUPABASE_BUCKET_NAME     | Storage 버킷 이름             |
| NEXT_PUBLIC_SITE_URL                 | 사이트 기본 URL               |
| NEXT_PUBLIC_KAKAO_JS_KEY             | 카카오 공유 API JavaScript 키 |
| NEXT_PUBLIC_NAVER_CLIENT_ID          | 네이버 지도 API 클라이언트 ID |

### 설치 및 실행

```bash
pnpm install
pnpm dev
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.
