# PROJECT_STATE

## 현재 목표
- 섹션 조합형 원페이지 제작 시스템
- 현재 업종 데모: 인테리어/시공 업체 원페이지 ("진용 프리미엄 인테리어")
- 판매용 데모 + 섹션 쇼룸(`/showroom`) 기반 확장

## 현재 기술 스택
- Astro (static site, `@tailwindcss/vite`)
- TypeScript
- Tailwind CSS v4
- JSON config (`src/data/clients/interior-sample.json`)
- sectionRegistry / showroom MVP (`src/lib/sectionRegistry.ts`, `src/pages/showroom.astro`)

## 완료된 주요 구조
- Global media resolver (`src/lib/mediaResolver.ts`, `src/lib/mediaDisplay.ts`, `src/types/media.ts`)
- MediaImage 공통 컴포넌트 (`src/components/media/MediaImage.astro`)
- Header01
- HeroMedia01
- StickyMobileCTA01
- ContactCTA01
- PortfolioGrid01
- BeforeAfter01
- Review01
- ProcessSteps01
- FAQ01
- ServiceCards01
- sectionRegistry MVP
- showroom MVP

## 현재 페이지 흐름 (`src/pages/index.astro`)
Header01
HeroMedia01
PortfolioGrid01
BeforeAfter01
Review01
ProcessSteps01
FAQ01
ServiceCards01
ContactCTA01
StickyMobileCTA01

## 현재 showroom 등록 상태 (`src/lib/sectionRegistry.ts`)
- HeroMedia01 (preview)
- PortfolioGrid01 (preview)
- BeforeAfter01 (preview)
- Review01 (preview)
- ProcessSteps01 (preview)
- FAQ01 (preview)
- ServiceCards01 (preview)
- ContactCTA01 (preview)
- Header01 (metadata only, preview 제외 — 전역 레이아웃 컴포넌트)
- StickyMobileCTA01 (metadata only, preview 제외 — fixed 고정 UI)

## 운영 규칙
- 새 섹션은 구현 → sectionRegistry 등록 → `/showroom` 확인 → `index.astro` 데모 적용 순서로 진행
- Chrome PC 기준만으로 완료 판단 금지
- 375 / 390 / 430 / 768 / 1280 viewport 검증 필수
- safe-area, tel/kakao 링크, `#anchor` 이동, 긴 텍스트(공백 없는 문자열 포함), 이미지 fallback, 404, console error 확인 필수
- 텍스트 요소는 `break-keep` + `break-words`를 함께 적용해 공백 없는 긴 텍스트로 인한 가로 스크롤을 방지(Review01/ProcessSteps01/FAQ01/ServiceCards01/PortfolioGrid01/BeforeAfter01 전 섹션 적용 완료)
- 고객 선택 UI, CMS/admin, preset 자동 생성은 아직 만들지 않음

## 현재 남은 리스크
- 실제 이미지 파일 투입 후 crop/fit/position 재검증 필요(현재 모든 이미지는 fallback 배경으로만 검증됨)
- README는 아직 전체 작성 전(현재 create-astro 기본 스캐폴드 상태)
- 실제 iOS Safari / Android Chrome / Samsung Internet / 카카오톡·네이버 인앱 브라우저 실기기 검증은 추후 필요(현재는 Playwright(Chromium) 기반 headless 검증까지만 완료)
- 실제 고객 자료 수집 양식/프로세스 필요
- 가격/상품화 문서는 아직 별도 필요

## 다음 예정
- FinalCTA01 또는 Footer01
- 이후 section variants 확장
- 이후 README/납품 문서 정리
- 이후 실제 이미지 적용 테스트

## 마지막 업데이트
- 날짜: 2026-07-10
- 작업: PortfolioGrid01/BeforeAfter01 텍스트 안정화 보강 및 PROJECT_STATE.md 최초 작성
