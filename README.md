# onepage-section-builder

섹션 조합형 원페이지 제작 시스템 MVP입니다.

## 1. 프로젝트 개요

- 섹션 조합형 원페이지 제작 시스템 MVP
- 현재 업종 데모: 인테리어/시공 업체 원페이지 ("진용 프리미엄 인테리어")
- 목적:
  - 실제 고객에게 보여줄 데모 페이지 제작
  - 재사용 가능한 섹션 라이브러리 구축
  - `/showroom`을 통한 섹션 전시장 운영
  - 향후 고객별 조합/preset/자동 생성 구조로 확장

## 2. 현재 페이지 구조

### `/`

실제 고객에게 보여줄 인테리어 원페이지 데모입니다.

현재 흐름:

- Header01
- HeroMedia01
- PortfolioGrid01
- BeforeAfter01
- Review01
- ProcessSteps01
- FAQ01
- ServiceCards01
- ContactCTA01
- Footer01
- StickyMobileCTA01

### `/showroom`

`sectionRegistry`에 등록된 섹션들을 확인하는 섹션 전시장입니다.

용도:

- 현재 보유 섹션 확인
- 섹션별 preview 확인
- 향후 고객에게 선택지로 보여줄 섹션 후보 관리

`/`는 컴포넌트를 직접 import해서 쓰는 실제 데모 페이지이고, `/showroom`은 `sectionRegistry`를 순회하며 등록된 섹션을 자동으로 나열하는 전시장입니다. `/`는 아직 registry 기반 동적 렌더링으로 전환되지 않았습니다.

## 3. 기술 스택

- Astro
- TypeScript
- Tailwind CSS v4
- JSON config
- Static site MVP

## 4. 실행 방법

필수:

- Node.js 22.12.0 이상
- `npm install`

명령어:

```sh
npm install
npm run dev
```

접속:

- http://localhost:4321/
- http://localhost:4321/showroom

빌드:

```sh
npm run build
npm run preview
```

## 5. 주요 폴더 구조

```text
src/
├── pages/
│   ├── index.astro          # 실제 인테리어 데모 페이지
│   └── showroom.astro       # 섹션 전시장 페이지
├── lib/
│   ├── sectionRegistry.ts   # showroom용 섹션 목록
│   ├── mediaResolver.ts     # 이미지 확장자 자동 탐색
│   └── mediaDisplay.ts      # fit/position/aspectRatio 클래스 변환
├── data/
│   └── clients/
│       └── interior-sample.json  # 샘플 고객 데이터
├── components/
│   ├── layout/               # Header01 / Footer01 / StickyMobileCTA01
│   ├── sections/              # 재사용 가능한 섹션 컴포넌트
│   └── media/                 # 공통 이미지 처리(MediaImage)
└── types/
    └── media.ts               # 미디어 관련 공통 타입

public/
└── clients/
    └── interior-sample/       # 고객별 이미지 자산 위치
```

각 폴더 설명:

- `pages`: 실제 라우트(`/`, `/showroom`)
- `lib/sectionRegistry.ts`: showroom이 읽어서 렌더링하는 섹션 목록
- `data/clients`: 고객별 JSON config(현재는 샘플 1개)
- `components/layout`: Header/Footer/Sticky CTA 등 페이지 전역 레이아웃 컴포넌트
- `components/sections`: 각 업종/목적별 재사용 가능한 섹션 컴포넌트
- `components/media`: 이미지 확장자 탐색/fit/fallback을 공통 처리하는 MediaImage
- `public/clients`: 고객별 이미지 자산 위치(확장자 없는 경로로 config에서 참조)

## 6. 현재 구현된 섹션

Layout:

- Header01 — 반응형 헤더(로고/내비게이션/CTA/모바일 햄버거 메뉴)
- Footer01 — 업체 정보/하단 내비게이션/연락 링크/저작권을 표시하는 사이트 하단 섹션
- StickyMobileCTA01 — 모바일 화면 하단에 고정되는 전화/상담 신청 CTA 바

Hero:

- HeroMedia01 — 배경 이미지/슬라이더 + 타이틀 + CTA 버튼으로 구성된 첫 화면 히어로

Content / Trust / Conversion:

- PortfolioGrid01 — 시공 사례 카드 그리드
- BeforeAfter01 — 시공 전후 비교 카드
- Review01 — 고객 후기 카드
- ProcessSteps01 — 상담부터 시공 완료까지 진행 절차 카드
- FAQ01 — 상담 전 자주 묻는 질문(정적 카드, accordion 아님)
- ServiceCards01 — 제공 가능한 서비스 범위 카드
- ContactCTA01 — 전화/카카오 상담 CTA(개인정보 수집 폼 없음)

## 7. 새 섹션 추가 흐름

1. 컴포넌트 생성
   - 예: `src/components/sections/example/Example01.astro`
2. `interior-sample.json`에 데이터 추가
3. `src/lib/sectionRegistry.ts`에 등록
4. `src/pages/showroom.astro`에서 preview 확인
   - registry에 등록하면 `showroom.astro`가 자동으로 목록/preview를 표시한다
5. `src/pages/index.astro`에 실제 데모 배치(직접 import)
6. 검증
   - `npm run build`
   - `/`, `/showroom` 페이지 확인
   - 375 / 390 / 430 / 768 / 1280 viewport 확인
   - 가로 스크롤 여부
   - anchor(`#섹션id`) 이동 확인
   - tel/kakao 링크 확인
   - 이미지 fallback 확인
   - console error / failed request 확인

## 8. 현재 설계 원칙

- Chrome PC 기준만으로 완료 판단하지 않는다.
- 모바일/태블릿/PC 모두 확인한다.
- 375 / 390 / 430 / 768 / 1280 viewport를 기본 확인한다.
- `w-screen` / `100vw` 사용에 주의한다(스크롤바 포함 계산으로 가로 스크롤이 생길 수 있음).
- 긴 한글 텍스트, 공백 없는 긴 문자열로 인한 가로 스크롤(overflow)을 확인한다(`break-keep` + `break-words` 병행).
- 이미지가 없어도 fallback이 깨지지 않아야 한다(404 없이 fallback 배경으로 대체).
- 실제 고객 정보/사업자 정보는 placeholder로 두고 임의로 생성하지 않는다.
- 문의폼/DB/CMS/admin은 아직 만들지 않는다.
- `index.astro`는 현재 컴포넌트 직접 import/render 방식이다.
- `showroom.astro`는 `sectionRegistry` 기반 preview다.
- 고객별 자동 조합/preset 렌더링은 후속 단계다.

## 9. 현재 하지 않는 것

- CMS/admin 없음
- 문의폼/DB 저장 없음
- 고객별 preset 자동 생성 없음
- drag & drop 섹션 빌더 없음
- 실제 고객 이미지 미포함(로고/히어로 이미지만 샘플로 존재, 나머지는 fallback)
- 실제 사업자 정보 미포함(placeholder 문구만 존재)
- 결제/로그인 없음

## 10. 남은 작업 후보

- 실제 이미지(Portfolio/BeforeAfter) 적용 및 crop/fit/position 재검증
- README 이후 세부 문서 보강
- 고객자료 수집 체크리스트
- 납품/운영 체크리스트
- 고객별 `sections` config 구조 검토
- preset 조합 구조 검토
- FinalCTA01 variant 필요성 검토
- 실제 기기(iOS Safari / Android Chrome / 카카오톡·네이버 인앱 브라우저) QA

## 11. 참고 문서

- [PROJECT_STATE.md](./PROJECT_STATE.md) — 현재 진행 상태, 남은 리스크, 다음 예정
