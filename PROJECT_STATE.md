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
- Footer01
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
Footer01
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
- Footer01 (preview — fixed 요소가 아니라 그대로 렌더링)
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

## 최근 QA
- 1차 데모 종합 QA 수행(24단계)
- / 및 /showroom 5개 viewport(375/390/430/768/1280) 점검, 전 구간 가로 스크롤 없음
- anchor(#portfolio~#footer) / tel / kakao / sticky / footer / showroom 회귀 점검, 이상 없음
- 8개 섹션 텍스트에 공백 없는 긴 한글 텍스트 동시 주입 스트레스 테스트 통과
- npx astro build 통과, console error / failed request / 404 없음
- 로고/히어로 이미지는 실제 파일로 정상 로드, Portfolio/BeforeAfter는 여전히 fallback 상태(예상된 동작)

## 현재 1차 데모 상태
- 데모 페이지 기본 흐름 완성(Header~Footer~StickyMobileCTA 전체 라인업)
- 섹션 전시장(`/showroom`) MVP 정상 작동(11개 등록, 9개 preview)
- 실제 이미지 투입 전 fallback 기준 안정화 완료

## 이미지 자산 상태
- 실제 이미지 적용 전 [IMAGE_ASSET_CHECKLIST.md](./IMAGE_ASSET_CHECKLIST.md) 작성 완료
- 로고/Hero 대표 이미지 1장은 실제 파일 존재, 정상 로드 확인(200, 404 없음)
- Portfolio 6장 / BeforeAfter 6장은 아직 파일 없음 — fallback 기준으로만 검증된 상태
- hero-02/03/05 파일은 public에 있지만 JSON 미반영(다음 단계 후보)
- 공개 데모 이미지와 실제 고객 이미지는 분리 관리 예정(`.gitignore`로 고객 폴더는 이미 제외됨)
- 실제 이미지 적용 전 자산 경로/누락/fallback 점검 완료(IMAGE_ASSET_CHECKLIST.md 9번 섹션)
- Portfolio/BeforeAfter는 여전히 파일 없음(12장 누락), Services/Review는 설계상 이미지 미사용 확인
- hero mobilePosition 필드는 정규화만 되고 실제로는 아직 소비되지 않음(향후 확장 포인트로 기록)
- 실제 고객 이미지 적용은 아직 하지 않음

## 고객자료 수집 상태
- [CLIENT_INTAKE_CHECKLIST.md](./CLIENT_INTAKE_CHECKLIST.md) 작성 완료
- 실제 고객 자료 수집 전 체크리스트 준비 완료(업체 정보/Hero/Portfolio/BeforeAfter/후기/절차/FAQ/서비스/연락처/이미지 기준 포함)

## 납품/운영 체크리스트 상태
- [DELIVERY_CHECKLIST.md](./DELIVERY_CHECKLIST.md) 작성 완료
- 고객자료 수집 → 이미지 자산 → 납품 QA까지 기본 운영 문서 정리 완료
- Header "회사소개"(`#about`) dead anchor known issue를 DELIVERY_CHECKLIST.md의 납품 전 확인 항목으로 명시함 → 정리 완료(아래 참고)

## Header nav dead anchor 정리
- "회사소개"(target: `about`) 메뉴를 현재 실제 존재하는 "서비스"(target: `services`) 섹션으로 변경
- About01 섹션은 추후 필요 시 별도 단계에서 검토

## sections config / preset 설계 상태
- [SECTION_CONFIG_DESIGN.md](./SECTION_CONFIG_DESIGN.md) 작성 완료
- 고객별 sections config / preset 구조는 문서 설계까지 완료(실제 renderer 구현은 아직 없음)
- 추천 방향: Header/Footer/Sticky는 layout 분리, main 콘텐츠 섹션만 sections[] config 기반인 하이브리드 구조

## nav anchor 검증 상태
- `scripts/validate-anchors.mjs` 추가 완료(`npm run validate:anchors`)
- 빌드 결과(`dist/index.html`)의 `href="#target"`이 실제 `id="target"`을 가리키는지, id 중복이 없는지 검사
- 사용 흐름: `npx astro build` → `npm run validate:anchors`
- HTML 주석 안 설명 텍스트(예: StickyMobileCTA01.astro의 `id="contact"` 언급)로 인한 거짓 중복을 피하기 위해 주석 제거 후 검사
- 현재는 `/showroom`은 검사 대상이 아님(같은 컴포넌트 반복 렌더링으로 id가 의도적으로 겹칠 수 있어 `dist/index.html`만 검사)

## 브라우저/모바일/인앱 브라우저 QA 기준 상태
- [COMPATIBILITY_QA_CHECKLIST.md](./COMPATIBILITY_QA_CHECKLIST.md) 작성 완료
- Chrome/Edge/Firefox/iOS Safari/Android Chrome/Samsung Internet/카카오톡·네이버 인앱 브라우저 등 고려 기준 문서화
- 실제 자동화 테스트(Playwright cross-browser, 실기기 자동화 등) 구현은 아직 하지 않음

## 다음 후보
- 실제 Portfolio/BeforeAfter 이미지 적용 테스트(12장 확보 후 crop/fit/position 실제 재검증)
- hero.media에 hero-02/03 등 추가해 슬라이더 활성화 검토
- hero mobilePosition을 실제로 모바일/PC에 다르게 적용하는 확장 검토
- 이미지 경로 검증 스크립트(scripts/validate-anchors.mjs와 유사한 형태) 검토
- FinalCTA01 variant 필요성 검토
- 두 번째 client sample 구조 설계
- sections config prototype 문서화

## 마지막 업데이트
- 날짜: 2026-07-13
- 작업: COMPATIBILITY_QA_CHECKLIST.md 작성 — 브라우저/모바일/인앱 브라우저 호환성 QA 기준 문서화, npx astro build 통과
